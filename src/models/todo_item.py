
class TodoItem:
    def __init__(self, id: int, title: str, description: str = "", is_complete: bool = False):
        if not isinstance(id, int) or id <= 0:
            raise ValueError("ID must be a positive integer.")
        if not isinstance(title, str) or not title.strip():
            raise ValueError("Title cannot be empty.")
        if not isinstance(description, str):
            raise ValueError("Description must be a string.")
        if not isinstance(is_complete, bool):
            raise ValueError("is_complete must be a boolean.")

        self.id = id
        self.title = title
        self.description = description
        self.is_complete = is_complete

    def __repr__(self):
        return f"TodoItem(id={self.id}, title='{self.title}', is_complete={self.is_complete})"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "is_complete": self.is_complete,
        }

    @staticmethod
    def from_dict(data: dict):
        return TodoItem(
            id=data["id"],
            title=data["title"],
            description=data.get("description", ""),
            is_complete=data.get("is_complete", False),
        )
