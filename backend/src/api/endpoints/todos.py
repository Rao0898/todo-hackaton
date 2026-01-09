from typing import Any, List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from src.db.session import get_db
from src.models.todo import Todo, TodoCreate, TodoUpdate
from src.models.user import User
from src.crud.crud_todo import create_todo, get_todos_by_owner, get_todo_by_id, update_todo, delete_todo
from src.core.security import get_current_user
from src.crud.crud_user import get_user_by_email

router = APIRouter()

@router.get("/", response_model=List[Todo])
def read_todos_for_current_user(
    *,
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    user_db = get_user_by_email(session=session, email=current_user["email"])
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")

    todos = get_todos_by_owner(session=session, owner_id=user_db.id)
    return todos

@router.post("/", response_model=Todo)
def create_todo_for_current_user(
    *,
    session: Session = Depends(get_db),
    todo_in: TodoCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    user_db = get_user_by_email(session=session, email=current_user["email"])
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
        
    todo = create_todo(session=session, todo_create=todo_in, owner_id=user_db.id)
    return todo

@router.put("/{todo_id}", response_model=Todo)
def update_todo_for_current_user(
    *,
    session: Session = Depends(get_db),
    todo_id: UUID,
    todo_in: TodoUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    user_db = get_user_by_email(session=session, email=current_user["email"])
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")

    todo = get_todo_by_id(session=session, todo_id=todo_id, owner_id=user_db.id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    todo = update_todo(session=session, db_todo=todo, todo_update=todo_in)
    return todo

@router.delete("/{todo_id}", response_model=dict)
def delete_todo_for_current_user(
    *,
    session: Session = Depends(get_db),
    todo_id: UUID,
    current_user: User = Depends(get_current_user),
) -> Any:
    user_db = get_user_by_email(session=session, email=current_user["email"])
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")

    todo = get_todo_by_id(session=session, todo_id=todo_id, owner_id=user_db.id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    return delete_todo(session=session, db_todo=todo)