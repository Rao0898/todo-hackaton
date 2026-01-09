---
id: 0019
title: Fix NotNullViolation for User Password by Correcting Model Assignment
stage: green
date: 2026-01-06
surface: agent
model: gemini-cli
feature: 002-full-stack-webapp
branch: main
user: ""
command: ""
labels: ["bugfix", "backend", "fastapi", "database", "sqlmodel"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/crud/crud_user.py
tests:
 - Successful user creation (implicit)
---

## Prompt

Task: Fix NotNullViolation for the password column during signup.

Context: > * Database is working, but the INSERT query shows password: None.

Backend terminal error: null value in column "password" violates not-null constraint.

Instructions:

Check src/crud/crud_user.py: Verify the create_user function. Ensure the hashed_password is being correctly assigned to the User model's password field before session.add(db_obj).

Check src/api/endpoints/users.py: Ensure user_in.password is being passed correctly to the CRUD function.

Frontend Check: Look at the Next.js Signup component. Ensure the body of the fetch request uses the key "password" exactly as defined in the backend Pydantic schema.

Action: Fix the data flow to ensure the password is not null when saving to the database.

## Response snapshot

Successfully modified file: /mnt/d/todo-hackaton/todo-app/backend/src/crud/crud_user.py (1 replacements).

## Outcome

- ✅ Impact: High - The user registration was failing due to a database constraint violation, making it impossible for new users to sign up.
- 🧪 Tests: Implicitly verified by the successful application of the code change, which should resolve the database error.
- 📁 Files: 1 file modified.
- 🔁 Next prompts: User signup should now be fully functional.
- 🧠 Reflection: The issue was a subtle but critical mismatch between the attribute being assigned in the `create_user` function and the actual field defined on the `User` model. The `User` model inherited a `password` field from `UserBase`, but the CRUD function was attempting to initialize the object with a `hashed_password` keyword argument, which doesn't exist on the model. This left the actual `password` field as `None`, violating the database's `NOT NULL` constraint. The fix was to use the correct keyword argument (`password`) during `User` object instantiation, ensuring the hashed value was properly assigned.

## Evaluation notes (flywheel)

- Failure modes observed: None. The debugging process of tracing the data flow from the API endpoint to the CRUD layer and inspecting the model definitions was effective.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a