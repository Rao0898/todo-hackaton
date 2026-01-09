from typing import Any
from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session # Changed to sqlmodel.Session

from src.db.session import get_db
from src.models.user import User
from src.crud.crud_user import get_user_by_email
from src.core.security import create_access_token, verify_password
from src.core.config import logger

router = APIRouter()

@router.post("/token", response_model=dict) # Changed to dict for flexibility
def login_for_access_token(*, session: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    logger.info(f"Attempting to log in user: {form_data.username}")
    user = get_user_by_email(session=session, email=form_data.username)
    if not user:
        logger.warning(f"User not found: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    password_verified = verify_password(form_data.password, user.hashed_password)
    logger.info(f"Password verification for user {form_data.username}: {password_verified}")

    if not password_verified:
        logger.warning(f"Invalid password for user: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(
        data={"sub": user.email}
    )
    logger.info(f"User {form_data.username} logged in successfully")
    return {"access_token": access_token, "token_type": "bearer"}
