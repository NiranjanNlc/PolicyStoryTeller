from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field

from app.domain.models import NepalPoliciesBrief, Persona, PersonaStory, PolicyBrief, RiskAnalysis, VoteStance

LanguageCode = Literal["en", "ne"]


class _LangMixin(BaseModel):
    language: LanguageCode = Field(default="en")


class LawTextBody(_LangMixin):
    law_text: str = Field(..., min_length=10, max_length=3000)


class PersonaResponse(BaseModel):
    persona: Persona


class PersonasResponse(BaseModel):
    personas: list[Persona]


class PolicyBriefResponse(BaseModel):
    brief: PolicyBrief


class ScenarioBody(LawTextBody):
    persona: Persona


class ScenarioResponse(BaseModel):
    scenario: str


class RisksBody(ScenarioBody):
    scenario: str = Field(..., min_length=10, max_length=4000)


class RisksResponse(BaseModel):
    story_key: str
    risks: RiskAnalysis


class FullStoryResponse(BaseModel):
    story_key: str
    policy_brief: PolicyBrief
    stories: list[PersonaStory]


class NepalPoliciesBody(_LangMixin):
    pass


class NepalPoliciesResponse(BaseModel):
    brief: NepalPoliciesBrief


class VoteBody(BaseModel):
    story_key: str = Field(..., min_length=8, max_length=128)
    stance: VoteStance
