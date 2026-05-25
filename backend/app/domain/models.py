from __future__ import annotations

from enum import Enum
from typing import Literal

from pydantic import BaseModel, Field


class Persona(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    age: int = Field(..., ge=0, le=120)
    occupation: str = Field(..., min_length=1, max_length=200)
    location: str = Field(..., min_length=1, max_length=200)
    bio: str = Field(..., min_length=1, max_length=2000)


class RiskAnalysis(BaseModel):
    riskier: list[str] = Field(default_factory=list)
    safer: list[str] = Field(default_factory=list)


class PolicyBrief(BaseModel):
    summary: str = Field(..., min_length=1, max_length=2000)
    who_is_affected: str = Field(..., min_length=1, max_length=800)
    key_points: list[str] = Field(..., min_length=1, max_length=8)


class PersonaStory(BaseModel):
    persona: Persona
    scenario: str = Field(..., min_length=10, max_length=4000)
    risks: RiskAnalysis


class PersonasList(BaseModel):
    personas: list[Persona] = Field(..., min_length=2, max_length=4)


class NepalPolicyItem(BaseModel):
    title: str = Field(..., min_length=1, max_length=300)
    area: str = Field(..., min_length=1, max_length=80)
    year_or_status: str = Field(..., min_length=1, max_length=80)
    summary: str = Field(..., min_length=1, max_length=2000)
    who_it_affects: str = Field(..., min_length=1, max_length=500)
    confidence: str = Field(..., min_length=1, max_length=20)


class NepalPoliciesBrief(BaseModel):
    items: list[NepalPolicyItem] = Field(default_factory=list)
    disclaimer: str = Field(..., min_length=1, max_length=600)


class VoteStance(str, Enum):
    FOR = "for"
    AGAINST = "against"
    NEUTRAL = "neutral"


VoteLiteral = Literal["for", "against", "neutral"]
