from __future__ import annotations

import asyncio
import hashlib
import json
from typing import Literal

from app.application.json_response import parse_model_json, safe_parse_model_json
from app.application.ports import LLMCompletionPort, TextCachePort
from app.domain.models import (
    NepalPoliciesBrief,
    Persona,
    PersonaStory,
    PersonasList,
    PolicyBrief,
    RiskAnalysis,
)
from app.prompts import templates as P

Lang = Literal["en", "ne"]


def _cache_key(prefix: str, *parts: str) -> str:
    h = hashlib.sha256()
    for p in parts:
        h.update(p.encode("utf-8"))
        h.update(b"\x1e")
    return f"{prefix}:{h.hexdigest()}"


class GeneratePolicyBriefUseCase:
    def __init__(self, llm: LLMCompletionPort, cache: TextCachePort) -> None:
        self._llm = llm
        self._cache = cache

    async def execute(self, law_text: str, lang: Lang = "en") -> PolicyBrief:
        key = _cache_key("policy_brief", lang, law_text.strip())
        cached = self._cache.get(key)
        if cached:
            return PolicyBrief.model_validate_json(cached)

        raw = await self._llm.complete(
            P.policy_brief_system(lang), P.policy_brief_user(law_text, lang)
        )
        brief = safe_parse_model_json(PolicyBrief, raw)
        if brief is None:
            raw = await self._llm.complete(
                P.policy_brief_system(lang), P.policy_brief_retry_user(law_text, lang)
            )
            brief = safe_parse_model_json(PolicyBrief, raw)
        if brief is None:
            raise ValueError("Model did not return a valid policy brief JSON object")
        self._cache.set(key, brief.model_dump_json())
        return brief


class GeneratePersonaUseCase:
    def __init__(self, llm: LLMCompletionPort, cache: TextCachePort) -> None:
        self._llm = llm
        self._cache = cache

    async def execute(self, law_text: str, lang: Lang = "en") -> Persona:
        key = _cache_key("persona", lang, law_text.strip())
        cached = self._cache.get(key)
        if cached:
            return Persona.model_validate_json(cached)

        raw = await self._llm.complete(P.persona_system(lang), P.persona_user(law_text, lang))
        persona = safe_parse_model_json(Persona, raw)
        if persona is None:
            raw = await self._llm.complete(
                P.persona_system(lang), P.persona_retry_user(law_text, lang)
            )
            persona = safe_parse_model_json(Persona, raw)
        if persona is None:
            raise ValueError("Model did not return a valid persona JSON object")
        self._cache.set(key, persona.model_dump_json())
        return persona


class GeneratePersonasUseCase:
    def __init__(self, llm: LLMCompletionPort, cache: TextCachePort) -> None:
        self._llm = llm
        self._cache = cache

    async def execute(self, law_text: str, lang: Lang = "en") -> list[Persona]:
        key = _cache_key("personas", lang, law_text.strip())
        cached = self._cache.get(key)
        if cached:
            return PersonasList.model_validate_json(cached).personas

        raw = await self._llm.complete(P.personas_system(lang), P.personas_user(law_text, lang))
        result = safe_parse_model_json(PersonasList, raw)
        if result is None:
            raw = await self._llm.complete(
                P.personas_system(lang), P.personas_retry_user(law_text, lang)
            )
            result = safe_parse_model_json(PersonasList, raw)
        if result is None:
            raise ValueError("Model did not return a valid personas JSON object")
        self._cache.set(key, result.model_dump_json())
        return result.personas


class GenerateScenarioUseCase:
    def __init__(self, llm: LLMCompletionPort, cache: TextCachePort) -> None:
        self._llm = llm
        self._cache = cache

    async def execute(self, law_text: str, persona: Persona, lang: Lang = "en") -> str:
        pj = persona.model_dump_json()
        key = _cache_key("scenario", lang, law_text.strip(), pj)
        cached = self._cache.get(key)
        if cached:
            return cached

        raw = await self._llm.complete(
            P.scenario_system(lang), P.scenario_user(law_text, pj, lang)
        )
        scenario = raw.strip()
        if len(scenario) < 20:
            raw = await self._llm.complete(
                P.scenario_system(lang), P.scenario_retry_user(law_text, pj, lang)
            )
            scenario = raw.strip()
        self._cache.set(key, scenario)
        return scenario


class GenerateRisksUseCase:
    def __init__(self, llm: LLMCompletionPort, cache: TextCachePort) -> None:
        self._llm = llm
        self._cache = cache

    async def execute(
        self,
        law_text: str,
        persona: Persona,
        scenario: str,
        lang: Lang = "en",
    ) -> RiskAnalysis:
        pj = persona.model_dump_json()
        key = _cache_key("risks", lang, law_text.strip(), pj, scenario.strip())
        cached = self._cache.get(key)
        if cached:
            return RiskAnalysis.model_validate_json(cached)

        raw = await self._llm.complete(
            P.risks_system(lang), P.risks_user(law_text, pj, scenario, lang)
        )
        try:
            risks = parse_model_json(RiskAnalysis, raw)
        except Exception:
            raw = await self._llm.complete(
                P.risks_system(lang),
                P.risks_retry_user(law_text, pj, scenario, lang),
            )
            risks = parse_model_json(RiskAnalysis, raw)
        self._cache.set(key, risks.model_dump_json())
        return risks


async def _build_persona_story(
    law_text: str,
    persona: Persona,
    lang: Lang,
    scenario_uc: GenerateScenarioUseCase,
    risks_uc: GenerateRisksUseCase,
) -> PersonaStory:
    scenario = await scenario_uc.execute(law_text, persona, lang)
    risks = await risks_uc.execute(law_text, persona, scenario, lang)
    return PersonaStory(persona=persona, scenario=scenario, risks=risks)


class GenerateFullStoryUseCase:
    """Policy brief → diverse personas → per-persona scenario + risks."""

    def __init__(
        self,
        brief_uc: GeneratePolicyBriefUseCase,
        personas_uc: GeneratePersonasUseCase,
        scenario_uc: GenerateScenarioUseCase,
        risks_uc: GenerateRisksUseCase,
    ) -> None:
        self._brief_uc = brief_uc
        self._personas_uc = personas_uc
        self._scenario_uc = scenario_uc
        self._risks_uc = risks_uc

    async def execute(
        self, law_text: str, lang: Lang = "en"
    ) -> tuple[PolicyBrief, list[PersonaStory]]:
        # Sequential LLM calls to avoid OpenRouter 429 rate limits on free tiers.
        brief = await self._brief_uc.execute(law_text, lang)
        await asyncio.sleep(1.0)
        personas = await self._personas_uc.execute(law_text, lang)
        stories: list[PersonaStory] = []
        for persona in personas:
            stories.append(
                await _build_persona_story(
                    law_text, persona, lang, self._scenario_uc, self._risks_uc
                )
            )
            await asyncio.sleep(1.5)
        return brief, stories


class GetNepalPoliciesUseCase:
    """LLM-only knowledge pull of recent Nepal laws and policies."""

    def __init__(self, llm: LLMCompletionPort, cache: TextCachePort) -> None:
        self._llm = llm
        self._cache = cache

    async def execute(self, lang: Lang = "en") -> NepalPoliciesBrief:
        key = _cache_key("nepal_policies", lang)
        cached = self._cache.get(key)
        if cached:
            return NepalPoliciesBrief.model_validate_json(cached)

        raw = await self._llm.complete(
            P.nepal_policies_system(lang), P.nepal_policies_user(lang)
        )
        brief = safe_parse_model_json(NepalPoliciesBrief, raw)
        if brief is None:
            raw = await self._llm.complete(
                P.nepal_policies_system(lang), P.nepal_policies_retry_user(lang)
            )
            brief = safe_parse_model_json(NepalPoliciesBrief, raw)
        if brief is None:
            raise ValueError("Model did not return a valid Nepal policies JSON object")
        self._cache.set(key, brief.model_dump_json())
        return brief


def compute_story_key(law_text: str, stories: list[PersonaStory]) -> str:
    payload = {
        "law": law_text.strip(),
        "stories": [
            {
                "persona": s.persona.model_dump(),
                "scenario": s.scenario.strip(),
            }
            for s in stories
        ],
    }
    canonical = json.dumps(payload, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()
