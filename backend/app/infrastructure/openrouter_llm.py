from __future__ import annotations

import asyncio

import httpx

from app.application.ports import LLMCompletionPort
from app.infrastructure.config import Settings


def _normalize_openrouter_base(url: str) -> str:
    b = url.rstrip("/")
    if not b.endswith("/v1"):
        b = f"{b}/v1" if "/v1" not in b else b
    return b.rstrip("/")


def _parse_error_body(response: httpx.Response) -> str:
    try:
        data = response.json()
        err = data.get("error")
        if isinstance(err, dict) and err.get("message"):
            return str(err["message"])
    except Exception:
        pass
    text = (response.text or "").strip()
    return text[:300] if text else response.reason_phrase


def _extract_content(data: dict[str, object]) -> str:
    choices = data.get("choices")
    if not isinstance(choices, list) or not choices:
        return ""
    first = choices[0]
    if not isinstance(first, dict):
        return ""
    msg = first.get("message")
    if not isinstance(msg, dict):
        return ""
    content = msg.get("content")
    if isinstance(content, str) and content.strip():
        return content
    return ""


class OpenRouterLLMAdapter(LLMCompletionPort):
    """OpenRouter chat completions (OpenAI-compatible API)."""

    def __init__(self, settings: Settings) -> None:
        api_key = (settings.openrouter_api_key or "").strip()
        if not api_key:
            raise ValueError("OPENROUTER_API_KEY is required for OpenRouter provider")
        self._base = _normalize_openrouter_base(settings.openrouter_base_url)
        self._model = settings.openrouter_model
        self._api_key = api_key
        self._referer = (settings.openrouter_http_referer or "").strip()
        self._app_title = (settings.openrouter_app_title or "").strip()

    def _headers(self) -> dict[str, str]:
        headers: dict[str, str] = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }
        if self._referer:
            headers["HTTP-Referer"] = self._referer
        if self._app_title:
            headers["X-Title"] = self._app_title
        return headers

    async def _request(self, system_instruction: str, user_prompt: str) -> str:
        payload = {
            "model": self._model,
            "temperature": 0.7,
            "max_tokens": 2048,
            "messages": [
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": user_prompt},
            ],
        }
        async with httpx.AsyncClient(timeout=120.0) as client:
            r = await client.post(
                f"{self._base}/chat/completions",
                json=payload,
                headers=self._headers(),
            )
        if r.is_error:
            raise RuntimeError(
                f"OpenRouter error ({r.status_code}): {_parse_error_body(r)}"
            )
        text = _extract_content(r.json())
        if text:
            return text
        raise RuntimeError("OpenRouter returned no text")

    @staticmethod
    def _retryable(msg: str) -> bool:
        m = msg.lower()
        return any(
            x in m
            for x in ("429", "503", "502", "rate", "too many", "unavailable", "overloaded")
        )

    async def complete(self, system_instruction: str, user_prompt: str) -> str:
        last: Exception | None = None
        backoff = (3.0, 8.0, 15.0, 25.0)
        for attempt in range(len(backoff) + 1):
            try:
                return await self._request(system_instruction, user_prompt)
            except RuntimeError as e:
                last = e
                if self._retryable(str(e)) and attempt < len(backoff):
                    await asyncio.sleep(backoff[attempt])
                    continue
                raise
            except httpx.HTTPError as e:
                last = e
                if attempt < len(backoff):
                    await asyncio.sleep(backoff[attempt])
                    continue
                raise RuntimeError(f"OpenRouter request failed: {e}") from e
        if last:
            raise last
        raise RuntimeError("OpenRouter request failed")
