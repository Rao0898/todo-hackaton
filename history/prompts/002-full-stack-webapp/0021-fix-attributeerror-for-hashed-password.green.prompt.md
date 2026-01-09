---
id: 0021
title: Fix AttributeError for hashed_password
stage: green
date: 2026-01-07
surface: agent
model: gemini-1.5-pro
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: NULL
labels: [bug-fix]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- backend/src/models/user.py
tests:
- null
---

## Prompt

I am getting the following runtime error while running the Phase 2 FastAPI backend:

ERROR:
AttributeError: 'User' object has no attribute 'hashed_password'

This error occurs during the POST /auth/token request inside:
src/api/endpoints/auth.py

Specifically at:
verify_password(form_data.password, user.hashed_password)

Root Cause (for reference):
The User model being returned does not expose a `hashed_password` attribute, or the ORM model and Pydantic schema are misaligned. Either:
- the database User model is missing the `hashed_password` field, OR
- the wrong User schema (public/read schema instead of DB model) is being used during authentication, OR
- the field is named differently (e.g. `password_hash`) in the model.

Reference Solution Guidance:
A correct FastAPI auth setup usually ensures:
1. The SQLModel / ORM User table includes a `hashed_password` column.
2. The authentication logic uses the database model (not a response schema).
3. Password hashing + verification aligns with passlib usage.
4. Public schemas exclude `hashed_password`, but internal DB models include it.

Your task:
- Identify exactly why `hashed_password` is missing
- Fix the model / schema / CRUD layer mismatch
- Ensure authentication works without exposing sensitive fields
- Apply the fix in compliance with the existing Phase 2 spec and plan
- Do NOT add new features
- Do NOT modify Phase 1 code
- Implement the correction directly in the codebase

After fixing:
- Confirm which file(s) were updated
- Explain briefly why the fix resolves the error

## Response snapshot

Files updated: `backend/src/models/user.py`.
Explanation: The `User` model's `password` field was renamed to `hashed_password` to align with the `auth.py` endpoint's expectation, resolving the `AttributeError`. The `UserBase` class in `backend/src/models/user.py` now explicitly defines `hashed_password`.

## Outcome

- ✅ Impact: The `AttributeError` for `hashed_password` should be resolved, allowing user authentication to proceed correctly.
- 🧪 Tests: No new tests were added as this was a direct code fix addressing a naming inconsistency. The existing test suite should now pass if it was failing due to this error.
- 📁 Files: Only `backend/src/models/user.py` was modified to rename a field.
- 🔁 Next prompts: No further prompts are needed for this specific fix.
- 🧠 Reflection: The core issue was a naming mismatch where the `User` model stored the hashed password under a field named `password`, while the authentication logic expected it under `hashed_password`. Renaming the field in the model brought consistency and resolved the runtime error.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-phr.sh` script encountered "command not found" errors when trying to interpret file content as shell commands. This indicates a potential issue with the script's execution context or how it handles input that might resemble shell commands. However, the PHR file was still created.
- Graders run and results (PASS/FAIL): NULL
- Prompt variant (if applicable): NULL
- Next experiment (smallest change to try): NULL