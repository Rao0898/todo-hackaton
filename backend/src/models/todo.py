from typing import Optional
from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid

from sqlmodel import SQLModel, Field, Relationship

class TodoCreate(SQLModel):
    title: str = Field(index=True, nullable=False)
    completed: bool = Field(default=False, nullable=False)


class TodoUpdate(SQLModel):
    title: Optional[str] = None
    completed: Optional[bool] = None


class TodoBase(SQLModel):
    title: str = Field(index=True, nullable=False)
    completed: bool = Field(default=False, nullable=False)
    owner_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)

class Todo(TodoBase, table=True):
    __tablename__ = "todos"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, sa_column=Column(UUID(as_uuid=True), primary_key=True))

    owner: "User" = Relationship(back_populates="todos")
