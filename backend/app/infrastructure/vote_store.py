from __future__ import annotations

from threading import Lock

from app.application.ports import VoteStorePort


class InMemoryVoteStore(VoteStorePort):
    def __init__(self) -> None:
        self._lock = Lock()
        self._counts: dict[str, dict[str, int]] = {}

    def record(self, story_key: str, stance: str) -> None:
        stance = stance.lower()
        if stance not in ("for", "against", "neutral"):
            raise ValueError("Invalid stance")
        with self._lock:
            bucket = self._counts.setdefault(story_key, {"for": 0, "against": 0, "neutral": 0})
            bucket[stance] = bucket.get(stance, 0) + 1

    def counts(self, story_key: str) -> dict[str, int]:
        with self._lock:
            base = {"for": 0, "against": 0, "neutral": 0}
            base.update(self._counts.get(story_key, {}))
            return base
