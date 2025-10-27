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

    @property
    def cors_origins(self) -> list[str]:
        """Return the full list of CORS origins, including sensible defaults."""

        origins: list[str] = [str(origin) for origin in self.allowed_origins]
        if self.frontend_url:
            origins.append(str(self.frontend_url))

        if not origins:
            origins.extend([
                "http://localhost:3000",
                "http://127.0.0.1:3000",
            ])

        # Preserve order but remove duplicates
        seen: set[str] = set()
        unique_origins: list[str] = []
        for origin in origins:
            if origin not in seen:
                seen.add(origin)
                unique_origins.append(origin)

        return unique_origins


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
