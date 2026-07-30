"""FastAPI application entry point.

Auto-creates database tables on startup (via ``lifespan``) and exposes
a ``/health`` endpoint for readiness checks.  Import this module to
run with Uvicorn::

    uvicorn app.main:app --reload
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.db.base import Base
from app.db.session import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: create tables on startup, dispose engine on shutdown."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(title="Pebble API", lifespan=lifespan)


@app.get("/health")
async def health():
    """Simple readiness probe — returns ``{"status": "ok"}`` when the server is running."""
    return {"status": "ok"}
