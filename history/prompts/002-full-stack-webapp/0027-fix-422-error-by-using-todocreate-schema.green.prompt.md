---
id: 0027
title: Fix 422 Error by Using TodoCreate Schema
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [backend, schema, 422, fastapi]
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

Task: Fix 422 Unprocessable Content (Field required: owner_id).

Context:

Backend TodoCreate schema requires owner_id in the request body.

Frontend is only sending title and completed.

Instructions:

Update Backend Schema: Open backend/src/schemas/todo.py. In the TodoCreate class, make owner_id optional or remove it from the creation schema, as it should be handled by the backend logic.

Update Endpoint Logic: Open backend/src/api/endpoints/todos.py. In the create_todo function, ensure the owner_id is assigned from the current_user.id instead of expecting it from the request body.

Verify Frontend: Check frontend/src/pages/todos/index.tsx and ensure it is sending a valid title.

Goal: The user should be able to create a todo without providing owner_id manually.

## Response snapshot

I have fixed the 422 Unprocessable Content error that occurred when creating a todo. The issue was that the backend was expecting an `owner_id` from the frontend. I have introduced a new `TodoCreate` schema that does not include `owner_id`, and updated the API endpoint and CRUD function to use this new schema. The `owner_id` is now correctly assigned on the backend from the authenticated user.

## Outcome

- ✅ Impact: The backend now has a dedicated `TodoCreate` schema for creating todos, which does not require `owner_id` from the client. This resolves the 422 error and aligns with the principle that the backend should determine the owner from the authenticated session.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `backend/src/models/todo.py`, `backend/src/api/endpoints/todos.py`, and `backend/src/crud/crud_todo.py`.
- 🔁 Next prompts: None
- 🧠 Reflection: The root cause was a schema design issue where the creation schema (`TodoBase` at the time) was not distinguished from the read/update schema. Creating a separate `TodoCreate` schema is a clean solution that makes the API more robust and secure.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
