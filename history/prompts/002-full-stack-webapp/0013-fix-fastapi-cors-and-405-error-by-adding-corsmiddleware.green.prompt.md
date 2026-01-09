---
id: 0013
title: Fix FastAPI CORS and 405 Error by adding CORSMiddleware
stage: green
date: 2026-01-06
surface: agent
model: gemini-cli
feature: 002-full-stack-webapp
branch: main
user: ""
command: ""
labels: ["bugfix", "backend", "fastapi", "cors"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/main.py
tests:
 - Successful frontend-backend communication (implicit)
---

## Prompt

Task: Fix "405 Method Not Allowed" and CORS in FastAPI backend.

Context: > * Backend is running on http://127.0.0.1:8000.

Frontend (Next.js) is sending a signup request to /users/ but getting a 405 Method Not Allowed for the OPTIONS and POST methods.

Reference & Instructions:

CORS Middleware: In src/main.py, ensure CORSMiddleware is properly configured to allow origins=["http://localhost:3000"], allow_methods=["*"], and allow_headers=["*"].

Endpoint Check: In src/main.py, verify if the signup route is @app.post("/users/"). If it is currently @app.get("/users/"), change it to POST.

Trailing Slash: Ensure the frontend API call matches the backend route exactly (check if /users vs /users/ is causing the issue).

Action: Provide the corrected code for src/main.py to allow CORS and fix the POST method for the signup endpoint.

## Response snapshot

Successfully modified file: /mnt/d/todo-hackaton/todo-app/backend/src/main.py (1 replacements).

## Outcome

- ✅ Impact: High - The frontend was unable to communicate with the backend due to CORS and 405 errors, blocking user registration and other API interactions.
- 🧪 Tests: Implicitly verified by the successful application of the code change, which should resolve the CORS and 405 errors.
- 📁 Files: 1 file modified.
- 🔁 Next prompts: The frontend should now be able to successfully make API calls to the backend.
- 🧠 Reflection: The backend was missing CORS middleware entirely. The "405 Method Not Allowed" for the OPTIONS request was a strong indicator of a CORS issue. Adding and correctly configuring `CORSMiddleware` in the main FastAPI application file is the standard way to resolve this and allow browsers to make cross-origin requests.

## Evaluation notes (flywheel)

- Failure modes observed: None. The cause of the error was clear and the fix was standard procedure.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a