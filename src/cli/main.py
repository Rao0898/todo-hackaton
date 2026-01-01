import argparse
from services.todo_service import TodoService

def main():
    parser = argparse.ArgumentParser(description="CLI Todo Application")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Add command
    add_parser = subparsers.add_parser("add", help="Add a new todo item")
    add_parser.add_argument("title", type=str, help="Title of the todo item")
    add_parser.add_argument("--description", type=str, default="", help="Description of the todo item (optional)")

    # List command
    list_parser = subparsers.add_parser("list", help="List all todo items")

    # Update command
    update_parser = subparsers.add_parser("update", help="Update an existing todo item")
    update_parser.add_argument("id", type=int, help="ID of the todo item to update")
    update_parser.add_argument("--title", type=str, help="New title for the todo item (optional)")
    update_parser.add_argument("--description", type=str, help="New description for the todo item (optional)")

    # Delete command
    delete_parser = subparsers.add_parser("delete", help="Delete a todo item")
    delete_parser.add_argument("id", type=int, help="ID of the todo item to delete")

    # Complete command
    complete_parser = subparsers.add_parser("complete", help="Mark a todo item as complete")
    complete_parser.add_argument("id", type=int, help="ID of the todo item to mark complete")

    # Incomplete command
    incomplete_parser = subparsers.add_parser("incomplete", help="Mark a todo item as incomplete")
    incomplete_parser.add_argument("id", type=int, help="ID of the todo item to mark incomplete")

    args = parser.parse_args()

    todo_service = TodoService()

    if args.command == "add":
        try:
            todo_item = todo_service.add_todo(title=args.title, description=args.description)
            print(f"Added todo: ID={todo_item.id}, Title='{todo_item.title}'")
        except ValueError as e:
            print(f"Error adding todo: {e}")
    elif args.command == "list":
        todos = todo_service.list_todos()
        if not todos:
            print("No todo items found.")
        else:
            for todo in todos:
                status = "✓" if todo.is_complete else " "
                print(f"[{status}] {todo.id}: {todo.title} - {todo.description}")
    elif args.command == "update":
        try:
            if not any([args.title, args.description]):
                print("Error: At least one of --title or --description must be provided for update.")
            else:
                updated_todo = todo_service.update_todo(
                    todo_id=args.id,
                    title=args.title,
                    description=args.description
                )
                print(f"Updated todo: ID={updated_todo.id}, Title='{updated_todo.title}'")
        except ValueError as e:
            print(f"Error updating todo: {e}")
    elif args.command == "delete":
        try:
            todo_service.delete_todo(todo_id=args.id)
            print(f"Deleted todo with ID: {args.id}")
        except ValueError as e:
            print(f"Error deleting todo: {e}")
    elif args.command == "complete":
        try:
            todo_item = todo_service.mark_todo_status(todo_id=args.id, is_complete=True)
            print(f"Marked todo ID {todo_item.id} as complete.")
        except ValueError as e:
            print(f"Error marking todo complete: {e}")
    elif args.command == "incomplete":
        try:
            todo_item = todo_service.mark_todo_status(todo_id=args.id, is_complete=False)
            print(f"Marked todo ID {todo_item.id} as incomplete.")
        except ValueError as e:
            print(f"Error marking todo incomplete: {e}")
    elif args.command is None:
        parser.print_help()

if __name__ == "__main__":
    main()
