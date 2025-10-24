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
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 60 * 24
    jwt_algorithm: str = "HS256"

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
