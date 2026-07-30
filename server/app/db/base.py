from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Declarative base class for all SQLAlchemy ORM models.

    Every model in the application should inherit from this class so that
    ``Base.metadata`` collects all table definitions.  This metadata is used
    both by ``create_all()`` (on startup) and by Alembic (for migrations).
    """
