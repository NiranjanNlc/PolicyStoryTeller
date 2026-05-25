from __future__ import annotations

from typing import Protocol


class LLMCompletionPort(Protocol):
    """Abstraction over the text completion backend (OpenRouter implementation)."""

    async def complete(self, system_instruction: str, user_prompt: str) -> str:
        """Return raw model text (may include markdown fences)."""
        ...


class TextCachePort(Protocol):
    """Simple key-value cache for deterministic prompt outputs."""

    def get(self, key: str) -> str | None: ...

    def set(self, key: str, value: str) -> None: ...


class VoteStorePort(Protocol):
    """Persistence for aggregate stance counts keyed by story fingerprint."""

    def record(self, story_key: str, stance: str) -> None: ...

    def counts(self, story_key: str) -> dict[str, int]: ...
