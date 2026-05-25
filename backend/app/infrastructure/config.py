from __future__ import annotations

from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

_BACKEND_ROOT = Path(__file__).resolve().parents[2]
_ENV_PATH = _BACKEND_ROOT / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=_ENV_PATH if _ENV_PATH.is_file() else None,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    openrouter_api_key: str = Field(default="")
    openrouter_model: str = Field(
        default="google/gemma-3-4b-it",
        description="Model id from https://openrouter.ai/models",
    )
    openrouter_base_url: str = Field(default="https://openrouter.ai/api/v1")
    openrouter_http_referer: str = Field(
        default="http://localhost:5173",
        description="Optional site URL for OpenRouter rankings.",
    )
    openrouter_app_title: str = Field(
        default="Policy Storyteller",
        description="Optional app name sent as X-Title.",
    )

    cors_origins: str = Field(default="http://localhost:5173")

    def cors_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]
