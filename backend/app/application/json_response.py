from __future__ import annotations

import json
import re
from typing import Any, TypeVar

from pydantic import BaseModel, ValidationError

T = TypeVar("T", bound=BaseModel)


def extract_json_object(raw: str) -> str:
    """Strip markdown fences and isolate the first JSON object substring."""
    text = raw.strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text, re.IGNORECASE)
    if fence:
        text = fence.group(1).strip()
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise ValueError("No JSON object found in model output")
    return text[start : end + 1]


def parse_model_json(model_cls: type[T], raw: str) -> T:
    blob = extract_json_object(raw)
    data = json.loads(blob)
    return model_cls.model_validate(data)


def safe_parse_model_json(model_cls: type[T], raw: str) -> T | None:
    try:
        return parse_model_json(model_cls, raw)
    except (json.JSONDecodeError, ValidationError, ValueError):
        return None


def parse_risk_lists(raw: str) -> dict[str, Any] | None:
    try:
        blob = extract_json_object(raw)
        data = json.loads(blob)
    except (json.JSONDecodeError, ValueError):
        return None
    if not isinstance(data, dict):
        return None
    r, s = data.get("riskier"), data.get("safer")
    if not isinstance(r, list) or not isinstance(s, list):
        return None
    return {"riskier": [str(x) for x in r], "safer": [str(x) for x in s]}
