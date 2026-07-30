import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class Projects(Base):
    __tablename__="projects"

    projectId: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4()))
    updatedAt: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    userId: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"))
    user: Mapped["Users"] = relationship(back_populates="projects")
