"""Async database engine, session factory, and FastAPI dependency.

Usage inside a route handler::

    from app.db.session import get_db

    @router.get("/items")
    async def list_items(db: AsyncSession = Depends(get_db)):
        ...
"""

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from typing import AsyncGenerator
from app.config import settings

engine = create_async_engine(settings.database_url, echo=False)
"""Global async SQLAlchemy engine (singleton)."""

async_session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
"""Session factory that creates :class:`AsyncSession` instances on demand."""


async def get_db() -> AsyncGenerator:
    """FastAPI dependency that provides an async database session.

    Yields a session, commits on success, rolls back on any exception,
    and always closes the session in the ``finally`` block.
    """
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
