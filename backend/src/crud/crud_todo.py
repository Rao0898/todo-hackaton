from typing import List, Optional
from uuid import UUID

from sqlmodel import Session, select

from src.models.todo import Todo, TodoBase, TodoCreate, TodoUpdate
from src.models.user import User

def create_todo(*, session: Session, todo_create: TodoCreate, owner_id: UUID) -> Todo:
    """
    Creates a new todo item for a given owner.
    """
    db_todo = Todo.model_validate(todo_create, update={"owner_id": owner_id})
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

def get_todos_by_owner(*, session: Session, owner_id: UUID) -> List[Todo]:
    """
    Retrieves all todo items for a specific owner.
    """
    return session.exec(select(Todo).where(Todo.owner_id == owner_id)).all()

def get_todo_by_id(*, session: Session, todo_id: UUID, owner_id: UUID) -> Optional[Todo]:
    """
    Retrieves a single todo item by its ID and owner ID.
    """
    return session.exec(select(Todo).where(Todo.id == todo_id, Todo.owner_id == owner_id)).first()

def update_todo(*, session: Session, db_todo: Todo, todo_update: TodoUpdate) -> Todo:
    """
    Updates an existing todo item.
    """
    todo_data = todo_update.model_dump(exclude_unset=True)
    db_todo.sqlmodel_update(todo_data)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

def delete_todo(*, session: Session, db_todo: Todo):
    """
    Deletes a todo item from the database.
    """
    session.delete(db_todo)
    session.commit()
    return {"message": "Todo deleted successfully"}
