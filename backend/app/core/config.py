from functools import lru_cache
from typing import List

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Marketing Automation Platform"
    api_v1_str: str = "/api"
    database_url: str = "sqlite:///./app.db"
    frontend_url: AnyHttpUrl | None = None
    allowed_origins: List[AnyHttpUrl] = []
    debug: bool = True
    prometheus_enabled: bool = True

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
