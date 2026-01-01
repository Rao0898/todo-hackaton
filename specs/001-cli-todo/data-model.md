# Data Model: Phase 1: In-memory CLI Todo

## Todo Item

Represents a single task within the Todo application.

*   **Unique ID**: Integer (automatically assigned, deterministic, stable during runtime)
*   **Title**: String (mandatory, cannot be empty)
*   **Description**: String (optional, can be empty)
*   **IsComplete**: Boolean (default: `False`)

### Relationships

*   None (self-contained entity within the in-memory store).

### Validation Rules

*   Title: Must not be empty.
*   ID: Must be a positive integer, unique within the collection of todos.

### State Transitions

*   `IsComplete`: Can transition from `False` to `True` (mark complete) and `True` to `False` (mark incomplete).