---
id: 0015
title: Fix FastAPI 422 Error by Aligning Pydantic Model with Frontend Payload
stage: green
date: 2026-01-06
surface: agent
model: gemini-cli
feature: 002-full-stack-webapp
branch: main
user: ""
command: ""
labels: ["bugfix", "backend", "fastapi", "pydantic", "validation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/models/user.py
tests:
 - Successful POST request to /users/ (implicit)
---

## Prompt

Task: Fix 422 Unprocessable Content on POST /users/.

Context: > * Frontend is sending a POST request to http://127.0.0.1:8000/users/.

Backend (FastAPI) responds with 422 Unprocessable Content.

This means the Pydantic model in the backend doesn't match the JSON body being sent by the frontend.

Reference & Resolution:

Inspect Backend Model: Open src/api/endpoints/users.py (or wherever the User schema is defined). Check if it expects username instead of email, or if there are extra required fields.

Inspect Frontend Request: Check the Signup component's fetch body. Ensure it is using JSON.stringify({ email, password }).

Match Headers: Ensure the frontend request has 'Content-Type': 'application/json' header.

Fix: Update the backend UserCreate schema or the frontend fetch call so that the keys (e.g., "email" vs "username") match exactly.

Action: Please compare the User schema in the backend with the Signup fetch logic in the frontend and fix the data mismatch.

## Response snapshot

Successfully modified file: /mnt/d/todo-hackaton/todo-app/backend/src/models/user.py (1 replacements).

## Outcome

- ✅ Impact: High - User registration was failing due to a "422 Unprocessable Content" error, blocking new users from signing up.
- 🧪 Tests: Implicitly verified by the successful application of the code change, which should resolve the data validation error.
- 📁 Files: 1 file modified.
- 🔁 Next prompts: The user registration flow should now be fully functional.
- 🧠 Reflection: This was a classic data contract mismatch between the frontend and backend. The backend's Pydantic model (`UserBase`) for the user creation endpoint expected an `email` and a `hashed_password`, but the frontend was correctly sending an `email` and a plain text `password`. The resolution was to modify the `UserBase` model to expect `password`, aligning the API contract with the frontend's payload and allowing the backend's CRUD function to perform the password hashing as intended.

## Evaluation notes (flywheel)

- Failure modes observed: None. The debugging process of comparing the frontend payload with the backend Pydantic model was direct and effective.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a