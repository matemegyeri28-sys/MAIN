from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

from app.api.routes import router
from app.core.config import get_settings
from app.core.database import init_db

settings = get_settings()


def create_app() -> FastAPI:
    init_db()
    app = FastAPI(title=settings.app_name, debug=settings.debug)
    if settings.allowed_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.allowed_origins],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    app.include_router(router, prefix=settings.api_v1_str)

    if settings.prometheus_enabled:
        Instrumentator().instrument(app).expose(app)

    return app


app = create_app()
