from __future__ import annotations

from functools import lru_cache

from fastapi import Depends, HTTPException

from app.application.ports import LLMCompletionPort, TextCachePort, VoteStorePort
from app.application.use_cases import (
    GenerateFullStoryUseCase,
    GeneratePersonaUseCase,
    GeneratePersonasUseCase,
    GeneratePolicyBriefUseCase,
    GenerateRisksUseCase,
    GenerateScenarioUseCase,
    GetNepalPoliciesUseCase,
)
from app.application.vote_use_cases import GetVoteStatsUseCase, RecordVoteUseCase
from app.infrastructure.config import Settings
from app.infrastructure.memory_cache import InMemoryTextCache
from app.infrastructure.openrouter_llm import OpenRouterLLMAdapter
from app.infrastructure.vote_store import InMemoryVoteStore


def get_settings() -> Settings:
    """Fresh Settings each call so .env edits apply without clearing process cache."""
    return Settings()


@lru_cache
def get_text_cache() -> InMemoryTextCache:
    return InMemoryTextCache()


@lru_cache
def get_vote_store() -> InMemoryVoteStore:
    return InMemoryVoteStore()


async def get_llm_port(settings: Settings = Depends(get_settings)) -> LLMCompletionPort:
    """Resolve the LLM port to the OpenRouter adapter (sole provider)."""
    try:
        return OpenRouterLLMAdapter(settings)
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e)) from e


def get_generate_policy_brief_uc(
    llm: LLMCompletionPort = Depends(get_llm_port),
    cache: TextCachePort = Depends(get_text_cache),
) -> GeneratePolicyBriefUseCase:
    return GeneratePolicyBriefUseCase(llm, cache)


def get_generate_persona_uc(
    llm: LLMCompletionPort = Depends(get_llm_port),
    cache: TextCachePort = Depends(get_text_cache),
) -> GeneratePersonaUseCase:
    return GeneratePersonaUseCase(llm, cache)


def get_generate_personas_uc(
    llm: LLMCompletionPort = Depends(get_llm_port),
    cache: TextCachePort = Depends(get_text_cache),
) -> GeneratePersonasUseCase:
    return GeneratePersonasUseCase(llm, cache)


def get_generate_scenario_uc(
    llm: LLMCompletionPort = Depends(get_llm_port),
    cache: TextCachePort = Depends(get_text_cache),
) -> GenerateScenarioUseCase:
    return GenerateScenarioUseCase(llm, cache)


def get_generate_risks_uc(
    llm: LLMCompletionPort = Depends(get_llm_port),
    cache: TextCachePort = Depends(get_text_cache),
) -> GenerateRisksUseCase:
    return GenerateRisksUseCase(llm, cache)


def get_generate_full_uc(
    brief_uc: GeneratePolicyBriefUseCase = Depends(get_generate_policy_brief_uc),
    personas_uc: GeneratePersonasUseCase = Depends(get_generate_personas_uc),
    scenario_uc: GenerateScenarioUseCase = Depends(get_generate_scenario_uc),
    risks_uc: GenerateRisksUseCase = Depends(get_generate_risks_uc),
) -> GenerateFullStoryUseCase:
    return GenerateFullStoryUseCase(brief_uc, personas_uc, scenario_uc, risks_uc)


def get_nepal_policies_uc(
    llm: LLMCompletionPort = Depends(get_llm_port),
    cache: TextCachePort = Depends(get_text_cache),
) -> GetNepalPoliciesUseCase:
    return GetNepalPoliciesUseCase(llm, cache)


def get_record_vote_uc(
    store: VoteStorePort = Depends(get_vote_store),
) -> RecordVoteUseCase:
    return RecordVoteUseCase(store)


def get_vote_stats_uc(
    store: VoteStorePort = Depends(get_vote_store),
) -> GetVoteStatsUseCase:
    return GetVoteStatsUseCase(store)
