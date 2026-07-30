"""Convenience re-exports for all SQLAlchemy ORM models.

Importing this module is enough to register all model classes with
``Base.metadata`` so that Alembic autogenerate can detect them::

    from app.models import *   # noqa: F401, F403
"""

from app.models.users import Users
from app.models.projects import Projects

__all__ = ["Users", "Projects"]
