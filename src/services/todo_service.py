import json
import os
from typing import List, Dict, Optional
from models.todo_item import TodoItem

DATA_FILE = "data/todos.json"

class TodoService:
    def __init__(self):
        self._todos: Dict[int, TodoItem] = {}
        self._next_id = 1
        self._load_data()

    def _load_data(self):
        """Loads todos from the JSON file."""
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as f:
                data = json.load(f)
                self._next_id = data.get('next_id', 1)
                todos_data = data.get('todos', [])
                for item_data in todos_data:
                    todo = TodoItem.from_dict(item_data)
                    self._todos[todo.id] = todo

    def _save_data(self):
        """Saves todos to the JSON file."""
        data = {
            'next_id': self._next_id,
            'todos': [todo.to_dict() for todo in self._todos.values()]
        }
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=4)

    def _generate_id(self) -> int:
        current_id = self._next_id
        self._next_id += 1
        return current_id

    def add_todo(self, title: str, description: Optional[str] = None) -> TodoItem:
        """Adds a new todo item and saves to file."""
        if not title:
            raise ValueError("Title cannot be empty.")
        
        todo_id = self._generate_id()
        new_todo = TodoItem(id=todo_id, title=title, description=description or "")
        self._todos[todo_id] = new_todo
        self._save_data()
        return new_todo

    def list_todos(self) -> List[TodoItem]:
        """Returns a list of all todo items."""
        return list(self._todos.values())

    def get_todo_by_id(self, todo_id: int) -> Optional[TodoItem]:
        """Returns a todo item by its ID, or None if not found."""
        return self._todos.get(todo_id)

    def update_todo(self, todo_id: int, title: Optional[str] = None, description: Optional[str] = None) -> TodoItem:
        """Updates an existing todo item and saves to file."""
        todo = self.get_todo_by_id(todo_id)
        if not todo:
            raise ValueError(f"Todo with ID {todo_id} not found.")
        
        if title is not None:
            if not title:
                raise ValueError("Title cannot be empty.")
            todo.title = title
        if description is not None:
            todo.description = description
        
        self._save_data()
        return todo

    def delete_todo(self, todo_id: int) -> None:
        """Deletes a todo item by its ID and saves to file."""
        if todo_id not in self._todos:
            raise ValueError(f"Todo with ID {todo_id} not found.")
        del self._todos[todo_id]
        self._save_data()

    def mark_todo_status(self, todo_id: int, is_complete: bool) -> TodoItem:
        """Marks a todo item as complete or incomplete and saves to file."""
        todo = self.get_todo_by_id(todo_id)
        if not todo:
            raise ValueError(f"Todo with ID {todo_id} not found.")
        todo.is_complete = is_complete
        self._save_data()
        return todo