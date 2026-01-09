from typing import Optional
from uuid import UUID

from sqlmodel import Session, select

from src.models.user import User, UserBase
from src.core.security import get_password_hash

def create_user(*, session: Session, user_create: UserBase) -> User:
    """
    Creates a new user in the database.
    """
    hashed_password = get_password_hash(user_create.password)
    db_user = User(
        email=user_create.email,
        hashed_password=hashed_password,
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def get_user_by_email(*, session: Session, email: str) -> Optional[User]:
    """
    Retrieves a user by their email address.
    """
    return session.exec(select(User).where(User.email == email)).first()

def get_user_by_id(*, session: Session, user_id: UUID) -> Optional[User]:
    """
    Retrieves a user by their ID.
    """
    return session.exec(select(User).where(User.id == user_id)).first()
