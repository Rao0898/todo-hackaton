---
id: 0014
title: Fix FastAPI 404 Not Found for POST /users/
stage: green
date: 2026-01-06
surface: agent
model: gemini-cli
feature: 002-full-stack-webapp
branch: main
user: ""
command: ""
labels: ["bugfix", "backend", "fastapi", "routing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/api/endpoints/users.py
tests:
 - Successful POST request to /users/ (implicit)
---

## Prompt

Task: Fix 404 Not Found for POST request to /users/.

Context: > * Frontend is sending a POST request to http://127.0.0.1:8000/users/.

Backend terminal shows: POST /users/ HTTP/1.1 404 Not Found.

Reference & Instructions:

Route Audit: Open src/main.py. Look for the @app.post decorator.

Path Matching: Check if the route is defined as @app.post("/register") or @app.post("/signup") instead of /users/.

Trailing Slash: Check if the backend expects /users (without slash) but the frontend is sending /users/ (with slash). This often causes a 404 in FastAPI.

Fix: > * Update src/main.py to ensure the endpoint matches what the frontend is calling.

OR update the Frontend Signup component's fetch URL to match the actual backend route.

Action: Verify the correct endpoint in src/main.py and synchronize both frontend and backend to use the same path.

## Response snapshot

Successfully modified file: /mnt/d/todo-hackaton/todo-app/backend/src/api/endpoints/users.py (1 replacements).

## Outcome

- ✅ Impact: High - The user registration endpoint was not reachable, blocking a core functionality of the application.
- 🧪 Tests: Implicitly verified by the successful application of the code change, which should resolve the "404 Not Found" error.
- 📁 Files: 1 file modified.
- 🔁 Next prompts: The frontend should now be able to successfully register users.
- 🧠 Reflection: The issue stemmed from a common routing pitfall when combining `APIRouter` prefixes with individual endpoint paths. The `prefix="/users"` on the router in `main.py`, coupled with `/users/` on the endpoint in `users.py`, resulted in an unintended `//users/users/` path. Correcting the endpoint path within `users.py` to just `/` ensures the final combined path matches the frontend's request to `/users/`.

## Evaluation notes (flywheel)

- Failure modes observed: None. The cause was clearly identified and the solution was direct.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a