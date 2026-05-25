from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException

from app.application.use_cases import (
    GenerateFullStoryUseCase,
    GeneratePersonaUseCase,
    GeneratePersonasUseCase,
    GeneratePolicyBriefUseCase,
    GenerateRisksUseCase,
    GenerateScenarioUseCase,
    GetNepalPoliciesUseCase,
    compute_story_key,
)
from app.application.vote_use_cases import GetVoteStatsUseCase, RecordVoteUseCase
from app.domain.models import PersonaStory
from app.presentation.dependencies import (
    get_generate_full_uc,
    get_generate_persona_uc,
    get_generate_personas_uc,
    get_generate_policy_brief_uc,
    get_generate_risks_uc,
    get_generate_scenario_uc,
    get_nepal_policies_uc,
    get_record_vote_uc,
    get_vote_stats_uc,
)
from app.presentation.errors import raise_upstream
from app.presentation.schemas import (
    FullStoryResponse,
    LawTextBody,
    NepalPoliciesBody,
    NepalPoliciesResponse,
    PersonaResponse,
    PersonasResponse,
    PolicyBriefResponse,
    RisksBody,
    RisksResponse,
    ScenarioBody,
    ScenarioResponse,
    VoteBody,
)

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/generate/brief", response_model=PolicyBriefResponse)
async def generate_brief(
    body: LawTextBody,
    uc: GeneratePolicyBriefUseCase = Depends(get_generate_policy_brief_uc),
) -> PolicyBriefResponse:
    try:
        brief = await uc.execute(body.law_text, body.language)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e)) from e
    except Exception as e:
        raise_upstream(e)
    return PolicyBriefResponse(brief=brief)


@router.post("/generate/persona", response_model=PersonaResponse)
async def generate_persona(
    body: LawTextBody,
    uc: GeneratePersonaUseCase = Depends(get_generate_persona_uc),
) -> PersonaResponse:
    try:
        persona = await uc.execute(body.law_text, body.language)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e)) from e
    except Exception as e:
        raise_upstream(e)
    return PersonaResponse(persona=persona)


@router.post("/generate/personas", response_model=PersonasResponse)
async def generate_personas(
    body: LawTextBody,
    uc: GeneratePersonasUseCase = Depends(get_generate_personas_uc),
) -> PersonasResponse:
    try:
        personas = await uc.execute(body.law_text, body.language)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e)) from e
    except Exception as e:
        raise_upstream(e)
    return PersonasResponse(personas=personas)


@router.post("/generate/scenario", response_model=ScenarioResponse)
async def generate_scenario(
    body: ScenarioBody,
    uc: GenerateScenarioUseCase = Depends(get_generate_scenario_uc),
) -> ScenarioResponse:
    try:
        scenario = await uc.execute(body.law_text, body.persona, body.language)
    except Exception as e:
        raise_upstream(e)
    return ScenarioResponse(scenario=scenario)


@router.post("/generate/risks", response_model=RisksResponse)
async def generate_risks(
    body: RisksBody,
    uc: GenerateRisksUseCase = Depends(get_generate_risks_uc),
) -> RisksResponse:
    try:
        risks = await uc.execute(body.law_text, body.persona, body.scenario, body.language)
    except Exception as e:
        raise_upstream(e)
    story_key = compute_story_key(
        body.law_text,
        [PersonaStory(persona=body.persona, scenario=body.scenario, risks=risks)],
    )
    return RisksResponse(story_key=story_key, risks=risks)


@router.post("/generate/full", response_model=FullStoryResponse)
async def generate_full(
    body: LawTextBody,
    uc: GenerateFullStoryUseCase = Depends(get_generate_full_uc),
) -> FullStoryResponse:
    try:
        policy_brief, stories = await uc.execute(body.law_text, body.language)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e)) from e
    except Exception as e:
        raise_upstream(e)
    story_key = compute_story_key(body.law_text, stories)
    return FullStoryResponse(
        story_key=story_key,
        policy_brief=policy_brief,
        stories=stories,
    )


@router.post("/nepal/policies", response_model=NepalPoliciesResponse)
async def nepal_policies(
    body: NepalPoliciesBody,
    uc: GetNepalPoliciesUseCase = Depends(get_nepal_policies_uc),
) -> NepalPoliciesResponse:
    try:
        brief = await uc.execute(body.language)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e)) from e
    except Exception as e:
        raise_upstream(e)
    return NepalPoliciesResponse(brief=brief)


@router.post("/vote")
async def vote(
    body: VoteBody,
    uc: RecordVoteUseCase = Depends(get_record_vote_uc),
) -> dict[str, str]:
    try:
        uc.execute(body.story_key, body.stance.value)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    return {"status": "ok"}


@router.get("/vote/stats/{story_key}")
def vote_stats(
    story_key: str,
    uc: GetVoteStatsUseCase = Depends(get_vote_stats_uc),
) -> dict[str, int]:
    c = uc.execute(story_key)
    return {"for": c["for"], "against": c["against"], "neutral": c["neutral"]}
