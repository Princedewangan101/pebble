from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application configuration loaded from environment variables / .env file.

    Attributes:
        database_url:     Async Postgres DSN for SQLAlchemy (used at runtime via asyncpg).
        database_url_sync: Sync Postgres DSN for Alembic migrations (uses psycopg2).
    """

    database_url: str = "postgresql+asyncpg://user:password@localhost:5432/pebble"
    database_url_sync: str = "postgresql+psycopg2://user:password@localhost:5432/pebble"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
