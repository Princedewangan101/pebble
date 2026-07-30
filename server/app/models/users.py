import uuid
from datetime import datetime

from sqlalchemy import String, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

class Users(Base):
    __tablename__="users"
    
    userId: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid.uuid4()))
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    token: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    projects: Mapped[list["Projects"]] = relationship(back_populates="user")
