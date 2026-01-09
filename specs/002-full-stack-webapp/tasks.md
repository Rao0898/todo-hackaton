# Tasks: Full-Stack Web App

**Input**: Design documents from `/specs/002-full-stack-webapp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend project structure
- [X] T002 Initialize backend Python project with FastAPI dependencies in `backend/requirements.txt`
- [X] T003 Create frontend project structure
- [X] T004 Initialize frontend Next.js project with dependencies in `frontend/package.json`
- [X] T005 [P] Configure linting and formatting tools for backend (e.g., black, ruff)
- [X] T006 [P] Configure linting and formatting tools for frontend (e.g., ESLint, Prettier)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T007 [P] Setup database connection and session management in `backend/src/db/session.py`
- [X] T008 [P] Implement JWT authentication and authorization middleware in `backend/src/core/security.py`
- [X] T009 [P] Setup API routing and middleware structure in `backend/src/main.py`
- [X] T010 [P] Create base models for User and TodoItem in `backend/src/models/`
- [X] T011 [P] Configure error handling and logging infrastructure for the backend
- [X] T012 [P] Setup environment configuration management for both backend and frontend (e.g., .env files)
- [X] T013 [P] Configure Auth.js in the frontend application in `frontend/src/pages/api/auth/[...nextauth].ts`

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: A new user can create an account and an existing user can log in to the application.

**Independent Test**: A user can successfully sign up and log in.

### Implementation for User Story 1

- [X] T014 [US1] Implement User model in `backend/src/models/user.py`
- [X] T015 [US1] Implement CRUD operations for User in `backend/src/crud/crud_user.py`
- [X] T016 [US1] Implement User API endpoints in `backend/src/api/endpoints/users.py`
- [X] T017 [US1] Implement login endpoint in `backend/src/api/endpoints/auth.py`
- [X] T018 [US1] Create sign-up page in `frontend/src/pages/signup.tsx`
- [X] T019 [US1] Create login page in `frontend/src/pages/login.tsx`
- [X] T020 [US1] Implement authentication service in `frontend/src/services/authService.ts` to interact with the backend
- [X] T021 [US1] Implement logout functionality

---

## Phase 4: User Story 2 - Todo Management (Priority: P2)

**Goal**: A logged-in user can create, read, update, and delete their own todos.

**Independent Test**: A logged-in user can manage their todos.

### Implementation for User Story 2

- [X] T022 [US2] Implement TodoItem model in `backend/src/models/todo.py`
- [X] T023 [US2] Implement CRUD operations for TodoItem in `backend/src/crud/crud_todo.py`
- [X] T024 [US2] Implement Todo API endpoints in `backend/src/api/endpoints/todos.py`
- [X] T025 [US2] Create todo list page in `frontend/src/pages/todos/index.tsx`
- [X] T026 [US2] Create component for adding a new todo in `frontend/src/components/AddTodo.tsx`
- [X] T027 [US2] Create component for displaying a single todo item in `frontend/src/components/TodoItem.tsx`
- [X] T028 [US2] Implement todo service in `frontend/src/services/todoService.ts` to interact with the backend

---

## Phase 5: User Story 3 - Todo Completion (Priority: P3)

**Goal**: A logged-in user can mark their todos as complete or incomplete.

**Independent Test**: A logged-in user can change the completion status of their todos.

### Implementation for User Story 3

- [X] T029 [US3] Add `completed` field to TodoItem model in `backend/src/models/todo.py` (already done in T022, but good to verify)
- [X] T030 [US3] Implement logic to update the `completed` status in `backend/src/crud/crud_todo.py`
- [X] T031 [US3] Implement API endpoint to update the `completed` status in `backend/src/api/endpoints/todos.py`
- [ ] T032 [US3] Add checkbox or button to `frontend/src/components/TodoItem.tsx` to toggle completion status
- [X] T033 [US3] Implement frontend logic to call the API when the completion status is changed

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T034 [P] Add documentation to the backend API
- [X] T035 [P] Add documentation to the frontend components
- [X] T036 [P] Code cleanup and refactoring
- [X] T037 [P] Security hardening
- [X] T038 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on User Story 1 for authentication
- **User Story 3 (P3)**: Depends on User Story 2 for todo management

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 → Test independently (MVP)
3. Add User Story 2 → Test independently
4. Add User Story 3 → Test independently
