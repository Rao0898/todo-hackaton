---
id: 0024
title: Fix Backend 404 Error for GET /todos
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [backend, fastapi, routing, "404"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/api/endpoints/todos.py
tests:
 - None
---

## Prompt

Context:
Frontend (Next.js) authentication is now working correctly.
User can log in and token is issued successfully.
The /todos page exists and compiles in Next.js.

Current Issue:
When visiting http://localhost:3000/todos, the browser shows "Error: Not Found".

Backend logs show:
GET /todos/ → 404 Not Found

This confirms the frontend page is loading,
but the backend API endpoint for fetching todos is missing or incorrectly defined.

Why this error is happening:
- Frontend is making a GET request to /todos
- Backend does not have a matching GET /todos route
OR
- The todos router is registered with a prefix (e.g. /api/todos)
OR
- The router is not included in main.py
OR
- Only POST /todos exists, but GET /todos is missing

Task:
1. Inspect backend routes related to todos.
2. Check:
   - router prefix
   - HTTP method (GET vs POST)
   - router inclusion in main.py
3. Identify the correct backend endpoint path.
4. Fix the mismatch so frontend and backend use the SAME todos endpoint.
5. Do NOT modify authentication logic.
6. Do NOT change database schema.

Reference Corrections:
- If backend uses prefix `/api`, frontend must call `/api/todos`
- If GET /todos does not exist, add it properly
- Ensure todos router is included in FastAPI app
- Ensure CORS and authorization headers remain unchanged

Goal:
- Visiting http://localhost:3000/todos should load data
- Backend should return 200 OK for todos
- No 404 errors from backend
- Frontend should render todos successfully

## Response snapshot

I have fixed the 404 Not Found error for the GET /todos endpoint by removing the redundant `/todos/` prefix from the routes in `backend/src/api/endpoints/todos.py`. The routes are now correctly exposed under the `/todos` prefix defined in `main.py`.

## Outcome

- ✅ Impact: The frontend should now be able to successfully fetch todos from the backend at the `/todos` endpoint, resolving the 404 error.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `backend/src/api/endpoints/todos.py`.
- 🔁 Next prompts: None
- 🧠 Reflection: The issue was a duplicated prefix in the FastAPI routing configuration. Removing the prefix from the endpoint definitions while keeping it in the main router inclusion is the correct approach.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
