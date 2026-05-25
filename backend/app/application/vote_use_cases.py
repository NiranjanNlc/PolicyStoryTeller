from __future__ import annotations

from app.application.ports import VoteStorePort


class RecordVoteUseCase:
    def __init__(self, votes: VoteStorePort) -> None:
        self._votes = votes

    def execute(self, story_key: str, stance: str) -> None:
        self._votes.record(story_key, stance)


class GetVoteStatsUseCase:
    def __init__(self, votes: VoteStorePort) -> None:
        self._votes = votes

    def execute(self, story_key: str) -> dict[str, int]:
        return self._votes.counts(story_key)
