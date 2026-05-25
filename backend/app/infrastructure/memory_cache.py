from __future__ import annotations

from threading import Lock

from app.application.ports import TextCachePort


class InMemoryTextCache(TextCachePort):
    def __init__(self) -> None:
        self._data: dict[str, str] = {}
        self._lock = Lock()

    def get(self, key: str) -> str | None:
        with self._lock:
            return self._data.get(key)

    def set(self, key: str, value: str) -> None:
        with self._lock:
            self._data[key] = value
