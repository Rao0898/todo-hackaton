from typing import List, Optional
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from sqlmodel import SQLModel, Field, Relationship

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True, nullable=False)
    password: str = Field(nullable=False)

class User(SQLModel, table=True): # Inherit from SQLModel directly
    __tablename__ = "users"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, sa_column=Column(UUID(as_uuid=True), primary_key=True))
    email: str = Field(unique=True, index=True, nullable=False) # Redefine email
    hashed_password: str = Field(nullable=False) # Explicitly define hashed_password

    todos: List["Todo"] = Relationship(back_populates="owner")
