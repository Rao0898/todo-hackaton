from typing import List, Dict, Optional
from models.todo_item import TodoItem


class TodoService:
    def __init__(self):
        self._todos: Dict[int, TodoItem] = {}
        self._next_id = 1

    def _generate_id(self) -> int:
        current_id = self._next_id
        self._next_id += 1
        return current_id

    def add_todo(self, title: str, description: Optional[str] = None) -> TodoItem:
        """Adds a new todo item to the in-memory storage."""
        if not title:
            raise ValueError("Title cannot be empty.")
        
        todo_id = self._generate_id()
        new_todo = TodoItem(id=todo_id, title=title, description=description or "")
        self._todos[todo_id] = new_todo
        return new_todo

    def list_todos(self) -> List[TodoItem]:
        """Returns a list of all todo items."""
        return list(self._todos.values())

    def get_todo_by_id(self, todo_id: int) -> Optional[TodoItem]:
        """Returns a todo item by its ID, or None if not found."""
        return self._todos.get(todo_id)

    def update_todo(self, todo_id: int, title: Optional[str] = None, description: Optional[str] = None) -> TodoItem:
        """Updates an existing todo item."""
        todo = self.get_todo_by_id(todo_id)
        if not todo:
            raise ValueError(f"Todo with ID {todo_id} not found.")
        
        if title is not None:
            if not title:
                raise ValueError("Title cannot be empty.")
            todo.title = title
        if description is not None:
            todo.description = description
        return todo

    def delete_todo(self, todo_id: int) -> None:
        """Deletes a todo item by its ID."""
        if todo_id not in self._todos:
            raise ValueError(f"Todo with ID {todo_id} not found.")
        del self._todos[todo_id]

    def mark_todo_status(self, todo_id: int, is_complete: bool) -> TodoItem:
        """Marks a todo item as complete or incomplete."""
        todo = self.get_todo_by_id(todo_id)
        if not todo:
            raise ValueError(f"Todo with ID {todo_id} not found.")
        todo.is_complete = is_complete
        return todo