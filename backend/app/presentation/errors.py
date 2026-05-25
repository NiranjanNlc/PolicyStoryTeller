from __future__ import annotations

import httpx


def _raw_message(exc: Exception) -> str:
    if isinstance(exc, httpx.HTTPStatusError):
        try:
            data = exc.response.json()
            err = data.get("error")
            if isinstance(err, dict) and err.get("message"):
                return str(err["message"])
        except Exception:
            pass
        return f"{exc.response.status_code} {exc.response.reason_phrase}"
    return str(exc).strip()


def upstream_http_status(exc: Exception) -> int:
    raw = _raw_message(exc).lower()
    combined = f"{raw} {str(exc).lower()}"
    if "429" in combined or "rate limit" in combined or "too many" in combined:
        return 429
    if "503" in combined or "502" in combined or "unavailable" in combined:
        return 503
    return 502


def upstream_error_detail(exc: Exception) -> str:
    """Client-safe message without API keys."""
    status = upstream_http_status(exc)
    if status == 429:
        return (
            "The AI service is receiving too many requests right now. "
            "Wait about a minute, then press Generate again."
        )
    if status == 503:
        return (
            "The AI service is temporarily unavailable. "
            "Please try again in a few moments."
        )
    msg = str(exc).strip()
    if msg.startswith("OpenRouter"):
        return (
            "Could not reach the AI service. Check your API key and model in backend .env, "
            "then try again."
        )
    return msg or "Something went wrong while generating. Please try again."


def raise_upstream(exc: Exception) -> None:
    from fastapi import HTTPException

    raise HTTPException(
        status_code=upstream_http_status(exc),
        detail=upstream_error_detail(exc),
    ) from exc
