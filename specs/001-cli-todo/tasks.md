# Tasks: Phase 1: In-memory CLI Todo

**Input**: Design documents from `/specs/001-cli-todo/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL for this phase as per the spec. A `tests/` directory will be created for future phases, but no specific test tasks are generated here.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create `src/` directory in /mnt/d/todo-hackaton/todo-app/src/
- [ ] T002 Create `src/cli/` directory in /mnt/d/todo-hackaton/todo-app/src/cli/
- [ ] T003 Create `src/models/` directory in /mnt/d/todo-hackaton/todo-app/src/models/
- [ ] T004 Create `src/services/` directory in /mnt/d/todo-hackaton/todo-app/src/services/
- [ ] T005 Create `tests/` directory in /mnt/d/todo-hackaton/todo-app/tests/
- [ ] T006 Create `tests/unit/` directory in /mnt/d/todo-hackaton/todo-app/tests/unit/
- [ ] T007 [P] Create `__init__.py` in /mnt/d/todo-hackaton/todo-app/src/__init__.py
- [ ] T008 [P] Create `__init__.py` in /mnt/d/todo-hackaton/todo-app/src/cli/__init__.py
- [ ] T009 [P] Create `__init__.py` in /mnt/d/todo-hackaton/todo-app/src/models/__init__.py
- [ ] T010 [P] Create `__init__.py` in /mnt/d/todo-hackaton/todo-app/src/services/__init__.py
- [ ] T011 [P] Create `__init__.py` in /mnt/d/todo-hackaton/todo-app/tests/__init__.py
- [ ] T012 [P] Create `__init__.py` in /mnt/d/todo-hackaton/todo-app/tests/unit/__init__.py

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented (FR-007, FR-002)

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T013 Create `TodoItem` model class in /mnt/d/todo-hackaton/todo-app/src/models/todo_item.py
- [ ] T014 Create `TodoService` class with in-memory storage and ID generation in /mnt/d/todo-hackaton/todo-app/src/services/todo_service.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Todo (Priority: P1) 🎯 MVP

**Goal**: Enable users to add new todo items with a title and an optional description (FR-001, FR-002, FR-008, FR-009)

**Independent Test**: Can be fully tested by adding one or more todo items and verifying their creation.

### Implementation for User Story 1

- [ ] T015 [US1] Implement `add_todo` method in `TodoService` in /mnt/d/todo-hackaton/todo-app/src/services/todo_service.py
- [ ] T016 [US1] Implement CLI command for adding a todo in /mnt/d/todo-hackaton/todo-app/src/cli/main.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Todos (Priority: P1)

**Goal**: Enable users to view a list of all todo items, including their details and completion status (FR-003, FR-008)

**Independent Test**: Can be fully tested by adding various todos and then listing them, verifying correct display.

### Implementation for User Story 2

- [ ] T017 [US2] Implement `list_todos` method in `TodoService` in /mnt/d/todo-hackaton/todo-app/src/services/todo_service.py
- [ ] T018 [US2] Implement CLI command for listing todos in /mnt/d/todo-hackaton/todo-app/src/cli/main.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Update Todo (Priority: P2)

**Goal**: Enable users to update the title and/or description of an existing todo item by its ID (FR-004, FR-008, FR-009)

**Independent Test**: Can be fully tested by creating a todo, then updating its fields and verifying the changes.

### Implementation for User Story 3

- [ ] T019 [US3] Implement `update_todo` method in `TodoService` in /mnt/d/todo-hackaton/todo-app/src/services/todo_service.py
- [ ] T020 [US3] Implement CLI command for updating a todo in /mnt/d/todo-hackaton/todo-app/src/cli/main.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Delete Todo (Priority: P2)

**Goal**: Enable users to delete an existing todo item by its ID (FR-005, FR-008, FR-009)

**Independent Test**: Can be fully tested by creating a todo, then deleting it and verifying its absence.

### Implementation for User Story 4

- [ ] T021 [US4] Implement `delete_todo` method in `TodoService` in /mnt/d/todo-hackaton/todo-app/src/services/todo_service.py
- [ ] T022 [US4] Implement CLI command for deleting a todo in /mnt/d/todo-hackaton/todo-app/src/cli/main.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: User Story 5 - Mark Todo Complete/Incomplete (Priority: P2)

**Goal**: Enable users to mark a todo item as complete or incomplete by its ID (FR-006, FR-008, FR-009)

**Independent Test**: Can be fully tested by creating a todo, then marking it complete and incomplete, verifying status changes.

### Implementation for User Story 5

- [ ] T023 [US5] Implement `mark_todo_status` method in `TodoService` in /mnt/d/todo-hackaton/todo-app/src/services/todo_service.py
- [ ] T024 [US5] Implement CLI command for marking a todo in /mnt/d/todo-hackaton/todo-app/src/cli/main.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories (FR-008, FR-009, FR-010)

- [ ] T025 Implement robust input validation for all CLI commands in /mnt/d/todo-hackaton/todo-app/src/cli/main.py
- [ ] T026 Refine error messages and user prompts for all CLI operations in /mnt/d/todo-hackaton/todo-app/src/cli/main.py
- [ ] T027 Create the main application loop and command dispatcher in /mnt/d/todo-hackaton/todo-app/src/cli/main.py

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3/US4 but should be independently testable

### Within Each User Story

- Service method implementation before CLI command implementation.

### Parallel Opportunities

- Tasks T007-T012 in Phase 1 can run in parallel.
- Once Foundational phase completes, User Stories can be worked on in parallel by different team members (e.g., US1 and US2, then US3, etc.).

---

## Parallel Example: Phase 1

```bash
Task: "Create __init__.py in /mnt/d/todo-hackaton/todo-app/src/__init__.py"
Task: "Create __init__.py in /mnt/d/todo-hackaton/todo-app/src/cli/__init__.py"
Task: "Create __init__.py in /mnt/d/todo-hackaton/todo-app/src/models/__init__.py"
Task: "Create __init__.py in /mnt/d/todo-hackaton/todo-app/src/services/__init__.py"
Task: "Create __init__.py in /mnt/d/todo-hackaton/todo-app/tests/__init__.py"
Task: "Create __init__.py in /mnt/d/todo-hackaton/todo-app/tests/unit/__init__.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only - P1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. **STOP and VALIDATE**: Test User Stories 1 & 2 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (P1 MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (P1 complete)
4. Add User Story 3 → Test independently → Deploy/Demo (P2 started)
5. Add User Story 4 → Test independently → Deploy/Demo (P2 continued)
6. Add User Story 5 → Test independently → Deploy/Demo (P2 complete)
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 and 3
   - Developer B: User Story 2 and 4
   - Developer C: User Story 5 and Polish
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
