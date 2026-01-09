---
id: 0029
title: Fix 422 Error on PUT /todos by Using TodoUpdate Schema
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [backend, schema, 422, fastapi, put]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/models/todo.py
 - backend/src/api/endpoints/todos.py
 - backend/src/crud/crud_todo.py
tests:
 - None
---

## Prompt

Task: Fix 422 Unprocessable Content on PUT request for Todos.

Context:

Frontend successfully calls PUT /todos/{id} but receives 422.

The browser alert likely shows a validation error about missing fields or incorrect schema.

Instructions:

Check Backend PUT Schema: Open backend/src/schemas/todo.py. Look for the schema used in the PUT endpoint (likely TodoUpdate or TodoCreate). Check which fields are required.

Update Frontend Edit Logic: Open frontend/src/pages/todos/index.tsx. In the handleEditTodo (or similar) function, ensure the body of the fetch request includes all required fields.

Common Fix: If the backend requires both title and completed, make sure the frontend sends both, even if only the title is being changed.

Check Field Names: Ensure the frontend sends {"title": "new value"} and not {"task": "new value"}.

Sync Headers: Ensure Content-Type: application/json and Authorization headers are correctly sent.

Goal: Successfully update a todo and see the change reflected in the list with a 200 OK response.

## Response snapshot

I have fixed the 422 Unprocessable Content error that occurred when updating a todo. The issue was that the backend was expecting an `owner_id` for updates. I have introduced a new `TodoUpdate` schema with optional fields for `title` and `completed`, and updated the API endpoint and CRUD function to use this new schema. This ensures that only the intended fields can be updated and that `owner_id` is not required from the client.

## Outcome

- ✅ Impact: The backend now has a dedicated `TodoUpdate` schema for updating todos, which does not require `owner_id` from the client. This resolves the 422 error and aligns with the principle that a todo's owner should not be mutable.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `backend/src/models/todo.py`, `backend/src/api/endpoints/todos.py`, and `backend/src/crud/crud_todo.py`.
- 🔁 Next prompts: None
- 🧠 Reflection: The root cause was a schema design issue where the update schema was not distinguished from the base model, leading to incorrect validation. Creating a separate `TodoUpdate` schema with optional fields is a robust solution for partial updates.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
