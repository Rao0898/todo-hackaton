---
id: 0017
title: Fix MissingBackendError by installing bcrypt
stage: green
date: 2026-01-06
surface: agent
model: gemini-cli
feature: 002-full-stack-webapp
branch: main
user: ""
command: ""
labels: ["bugfix", "backend", "dependencies", "passlib", "bcrypt"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/requirements.txt
tests:
 - Successful backend startup (implicit)
---

## Prompt

Task: Fix MissingBackendError: bcrypt in backend.

Error: passlib.exc.MissingBackendError: bcrypt: no backends available.

Instructions:

Install Dependency: The backend virtual environment is missing the bcrypt library which passlib needs to hash passwords.

Action: Run the command pip install bcrypt inside the backend virtual environment.

Verification: After installation, restart the uvicorn server.

Requirements Update: Also, add bcrypt to the requirements.txt file to ensure this doesn't happen again.

Requirement: Confirm once the library is installed and the server is ready.

## Response snapshot

Success! The backend server started without any errors. This confirms that installing `bcrypt` has resolved the `passlib.exc.MissingBackendError`.

I have completed all the steps requested by the user:
1.  Installed `bcrypt`.
2.  Updated `backend/requirements.txt`.
3.  Confirmed the server starts successfully.

I am finished with the task.

## Outcome

- ✅ Impact: High - The backend was not starting due to a missing dependency for password hashing, blocking all user authentication functionality.
- 🧪 Tests: Implicitly verified by restarting the backend server, which started without the `MissingBackendError`.
- 📁 Files: 1 file modified (`backend/requirements.txt`).
- 🔁 Next prompts: The backend is now fully functional.
- 🧠 Reflection: The error message `passlib.exc.MissingBackendError: bcrypt: no backends available` was a clear indicator of a missing dependency. `passlib` requires a cryptographic backend like `bcrypt` to be explicitly installed. The solution was to install the `bcrypt` package into the correct virtual environment and add it to `requirements.txt` to ensure consistent environments in the future.

## Evaluation notes (flywheel)

- Failure modes observed: None. The error and solution were straightforward.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a