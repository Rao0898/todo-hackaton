from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session # Changed to sqlmodel.Session

from src.db.session import get_db
from src.models.user import User, UserBase
from src.crud.crud_user import create_user, get_user_by_email
from src.core.security import get_current_user # To protect endpoints later

router = APIRouter()

@router.post("/", response_model=User)
def register_user(*, session: Session = Depends(get_db), user_in: UserBase) -> Any:
    """
    Register a new user.
    
    This endpoint allows new users to create an account by providing their email and password.
    """
    user = get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this email already exists in the system.",
        )
    user = create_user(session=session, user_create=user_in)
    return user
