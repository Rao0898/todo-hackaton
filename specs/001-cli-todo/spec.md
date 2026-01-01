# Feature Specification: Phase 1: In-memory CLI Todo

**Feature Branch**: `001-cli-todo`  
**Created**: 2025-12-30  
**Status**: Draft  
**Input**: User description: "Create the Phase 1 specification for the project “The Evolution of Todo”. Phase 1 Scope: Build a Python-based command-line Todo application with in-memory storage only. Functional Requirements: • Add a todo with title and optional description. • View/list all todos with unique IDs and completion status. • Update todo title and/or description by ID. • Delete a todo by ID. • Mark a todo as complete or incomplete by ID. Behavior Requirements: • Todos exist only in memory for the lifetime of the process. • IDs must be deterministic and stable during runtime. • CLI must provide clear prompts, confirmations, and error messages. • Invalid inputs (non-existent ID, empty title, etc.) must be handled gracefully. Non-Functional Requirements: • Python 3.13+ compatible. • Clean, modular structure following SRP. • No databases, files, networking, or external services. • No features beyond those explicitly listed. Constraints: • Development must comply with the project Constitution. • WSL 2 (Ubuntu) environment. • AI agent generates all implementation code; humans only review. Out of Scope: • Persistence, authentication, UI frameworks, APIs, tests, or cloud components. Deliverables: • Runnable CLI application. • Source code under /src. • Phase 1 spec saved to specs history. Generate a clear, concise Phase 1 specification document."

## User Scenarios & Testing (mandatory)

### User Story 1 - Add Todo (Priority: P1)

As a user, I want to add new todo items with a title and an optional description so that I can keep track of my tasks.

**Why this priority**: This is the foundational feature; without adding todos, no other functionality is useful.

**Independent Test**: Can be fully tested by adding one or more todo items and verifying their creation. Delivers the core ability to log tasks.

**Acceptance Scenarios**:

1.  **Given** no todos exist,
    **When** the user adds a todo with title "Buy groceries" and no description,
    **Then** a new todo with ID 1, title "Buy groceries", empty description, and incomplete status is created.
2.  **Given** no todos exist,
    **When** the user adds a todo with title "Call mom" and description "Wish her happy birthday",
    **Then** a new todo with ID 2, title "Call mom", description "Wish her happy birthday", and incomplete status is created.
3.  **Given** a todo with title "Walk dog" already exists,
    **When** the user adds another todo with title "Feed cat",
    **Then** "Feed cat" is added as a new todo with a unique ID.

---

### User Story 2 - View Todos (Priority: P1)

As a user, I want to view a list of all my todo items, including their details and completion status, so I can see what tasks I have.

**Why this priority**: Essential for interacting with tasks after creation, providing visibility into the workload.

**Independent Test**: Can be fully tested by adding various todos and then listing them, verifying correct display. Delivers the ability to review tasks.

**Acceptance Scenarios**:

1.  **Given** multiple todos exist (some complete, some incomplete),
    **When** the user views all todos,
    **Then** all todos are listed with their unique IDs, titles, descriptions, and completion status.
2.  **Given** no todos exist,
    **When** the user views all todos,
    **Then** a message indicating no todos are present is displayed.

---

### User Story 3 - Update Todo (Priority: P2)

As a user, I want to update the title and/or description of an existing todo item by its ID, so I can modify my tasks as needed.

**Why this priority**: Important for task management, but secondary to creation and viewing.

**Independent Test**: Can be fully tested by creating a todo, then updating its fields and verifying the changes. Delivers the ability to refine tasks.

**Acceptance Scenarios**:

1.  **Given** a todo with ID 1, title "Old Title", description "Old Description",
    **When** the user updates todo 1 to have title "New Title" and description "New Description",
    **Then** todo 1's title and description are updated.
2.  **Given** a todo with ID 1, title "Old Title", description "Old Description",
    **When** the user updates todo 1 to only have title "New Title",
    **Then** todo 1's title is updated and description remains "Old Description".
3.  **Given** a todo with ID 1, title "Old Title", description "Old Description",
    **When** the user updates todo 1 to only have description "New Description",
    **Then** todo 1's description is updated and title remains "Old Title".
4.  **Given** no todo exists with ID 99,
    **When** the user attempts to update todo 99,
    **Then** an error message indicating the todo was not found is displayed.

---

### User Story 4 - Delete Todo (Priority: P2)

As a user, I want to delete an existing todo item by its ID, so I can remove completed or irrelevant tasks.

**Why this priority**: Necessary for task cleanup, but depends on tasks existing.

**Independent Test**: Can be fully tested by creating a todo, then deleting it and verifying its absence. Delivers the ability to clear tasks.

**Acceptance Scenarios**:

1.  **Given** a todo with ID 1 exists,
    **When** the user deletes todo 1,
    **Then** todo 1 is removed from the list of todos.
2.  **Given** no todo exists with ID 99,
    **When** the user attempts to delete todo 99,
    **Then** an error message indicating the todo was not found is displayed.

---

### User Story 5 - Mark Todo Complete/Incomplete (Priority: P2)

As a user, I want to mark a todo item as complete or incomplete by its ID, so I can track my progress.

**Why this priority**: Provides status tracking, enhancing task management functionality.

**Independent Test**: Can be fully tested by creating a todo, then marking it complete and incomplete, verifying status changes. Delivers the ability to manage task status.

**Acceptance Scenarios**:

1.  **Given** an incomplete todo with ID 1,
    **When** the user marks todo 1 as complete,
    **Then** todo 1's status changes to complete.
2.  **Given** a complete todo with ID 2,
    **When** the user marks todo 2 as incomplete,
    **Then** todo 2's status changes to incomplete.
3.  **Given** no todo exists with ID 99,
    **When** the user attempts to mark todo 99 as complete,
    **Then** an error message indicating the todo was not found is displayed.

---

### Edge Cases

- What happens when an empty title is provided for adding/updating a todo? System should gracefully handle this by not allowing creation/update or by providing an error message.
- How does the system handle non-numeric or negative IDs when expecting a numeric ID? System should gracefully handle this by providing an error message for invalid input.
- What happens when a non-existent ID is provided for update, delete, or mark complete/incomplete operations? System should indicate "Todo not found" with an appropriate error message.
- What happens if the description is very long? System should handle it without crashing, displaying the full description if possible within CLI constraints.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: System MUST allow users to add a new todo item with a title and an optional description.
- **FR-002**: System MUST assign a unique, deterministic, and stable ID to each new todo item.
- **FR-003**: System MUST display a list of all current todo items, including their unique ID, title, description, and completion status.
- **FR-004**: System MUST allow users to update the title and/or description of an existing todo item by its unique ID.
- **FR-005**: System MUST allow users to delete an existing todo item by its unique ID.
- **FR-006**: System MUST allow users to mark an existing todo item as complete or incomplete by its unique ID.
- **FR-007**: System MUST store todo items only in memory for the duration of the application process.
- **FR-008**: System MUST provide clear prompts, confirmations, and error messages to the user.
- **FR-009**: System MUST gracefully handle invalid inputs, such as non-existent IDs, empty titles, or non-numeric inputs for ID.
- **FR-010**: System MUST NOT include any features beyond those explicitly listed in this specification.

### Key Entities

-   **Todo Item**: Represents a single task.
    *   Attributes: Unique ID (integer), Title (string), Description (string, optional), IsComplete (boolean).

## Success Criteria (mandatory)

### Measurable Outcomes

-   **SC-001**: Users can successfully add, view, update, delete, and mark complete/incomplete all todo items via the CLI without encountering crashes or unhandled errors.
-   **SC-002**: The CLI application provides clear, intuitive feedback for all operations (prompts, confirmations, errors), allowing users to understand the system state at all times.
-   **SC-003**: The application maintains 100% data integrity for in-memory todo items throughout its lifecycle, ensuring consistent behavior for given inputs.
-   **SC-004**: All functional requirements are met within the specified in-memory, CLI-only constraints.
-   **SC-005**: The application adheres to Python 3.13+ compatibility and follows clean, modular coding practices.