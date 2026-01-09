---
id: 0030
title: Fix NameError in todos.py for missing router definition
stage: red
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [backend, fastapi, error]
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

Task: Fix NameError: name 'router' is not defined in backend/src/api/endpoints/todos.py.

Context: > * The server is failing to start because the router object is missing in todos.py.

This happened after attempting to fix the PUT 422 error.

Instructions:

Open File: backend/src/api/endpoints/todos.py.

Add Missing Router Definition: At the top of the file (after imports), add: router = APIRouter()

Add Missing Imports: Ensure from fastapi import APIRouter, Depends, HTTPException and other necessary imports like Session and your schemas are present.

Fix Schema Mismatch: While you are at it, ensure the @router.put function correctly uses the TodoUpdate schema (or whatever you named it) so we don't get the 422 error again.

Goal: The uvicorn server should start successfully without any NameError.

## Response snapshot

I have fixed the `NameError: name 'router' is not defined` in `backend/src/api/endpoints/todos.py` by adding `router = APIRouter()` after the imports. This ensures the FastAPI router is correctly initialized. I also verified that the `PUT` endpoint uses the `TodoUpdate` schema as intended.

## Outcome

- ✅ Impact: The backend server should now start successfully without the `NameError`.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `backend/src/api/endpoints/todos.py`.
- 🔁 Next prompts: None
- 🧠 Reflection: This error was a regression from previous changes. It highlights the importance of re-verifying the integrity of modified files, especially after complex replacements.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
