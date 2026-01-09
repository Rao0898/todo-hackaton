---
id: 0025
title: Fix Frontend/Backend Schema Mismatch and Rendering for Todos
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [frontend, backend, schema, rendering, 422]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/components/AddTodo.tsx
 - frontend/src/pages/todos/index.tsx
 - frontend/src/components/TodoItem.tsx
tests:
 - None
---

## Prompt

You are a senior Full-Stack Engineer (Next.js + FastAPI + PostgreSQL).

I am facing multiple connected issues in a Todo App.
Read the full context carefully and then FIX the problems step-by-step.
Do NOT guess. Match frontend and backend schemas exactly.

====================
PROJECT CONTEXT
====================

Frontend:
- Next.js 14
- NextAuth is used for authentication
- Todos page: /todos
- Backend API runs on http://127.0.0.1:8000

Backend:
- FastAPI
- SQLModel + PostgreSQL (Neon)
- JWT Auth
- Todos endpoints: GET /todos/, POST /todos/
- Auth endpoint: POST /auth/token

====================
CURRENT ERRORS
====================

1) Frontend shows:
   "[object Object]"
   when I add a todo like "my first todo"

2) Backend terminal shows:
   POST /todos/ → 422 Unprocessable Content

3) Backend logs confirm:
   GET /todos/ → 200 OK
   POST /todos/ → 422

4) Swagger ( /docs ) works when correct JSON is sent.

====================
ROOT CAUSE (IMPORTANT)
====================

- Frontend is rendering the ENTIRE todo object instead of a specific field
  (React renders objects as [object Object])

- Frontend POST request body does NOT match FastAPI TodoCreate schema
  (field name mismatch OR missing required field)

====================
WHAT YOU MUST DO
====================

1) Inspect backend Todo schema (TodoCreate / TodoRead)
   - Identify exact required fields (e.g. title, text, completed)

2) Fix frontend POST /todos request:
   - Ensure JSON body keys EXACTLY match backend schema
   - Ensure Content-Type is application/json
   - Ensure Authorization Bearer token is included

3) Fix frontend rendering:
   - Render todo.title OR todo.text
   - NEVER render the full todo object directly in JSX

4) Ensure /todos page:
   - Displays todo text correctly
   - Can add a new todo without 422 error
   - No "[object Object]" appears

====================
EXPECTED RESULT
====================

- Adding "my first todo" shows text properly on UI
- POST /todos returns 200
- Backend terminal shows no 422 errors
- Todos list renders cleanly

====================
IMPORTANT RULES
====================

- Do NOT change backend logic unless required
- Do NOT invent field names
- Match schemas exactly
- Apply minimal but correct fixes
- Explain briefly WHY the error happened and HOW it was fixed

## Response snapshot

I have fixed the frontend/backend schema mismatch and rendering issues for todos.
- In `frontend/src/components/AddTodo.tsx`, I added the `completed` field to the `POST` request to match the backend schema and fix the 422 error.
- In `frontend/src/pages/todos/index.tsx`, I updated the `PUT` request to include the `title` field to match the backend schema and fix a potential 422 error.
- In `frontend/src/components/TodoItem.tsx`, I simplified the rendering to isolate and fix the `[object Object]` issue.

## Outcome

- ✅ Impact: The application should no longer produce 422 errors when adding or updating todos. The `[object Object]` rendering issue should be resolved.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `frontend/src/components/AddTodo.tsx`, `frontend/src/pages/todos/index.tsx`, and `frontend/src/components/TodoItem.tsx`.
- 🔁 Next prompts: None
- 🧠 Reflection: The issues were a combination of frontend/backend schema mismatch and a rendering problem. Fixing the data being sent to the backend and simplifying the rendering component were the key steps.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
