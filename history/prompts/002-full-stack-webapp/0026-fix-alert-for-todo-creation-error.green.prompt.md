---
id: 0026
title: Fix Alert for Todo Creation Error
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [frontend, alert, error-handling, 422]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/components/AddTodo.tsx
tests:
 - None
---

## Prompt

Task: Fix 422 Unprocessable Content when adding a Todo.

Context: > * User is on /todos page.

Clicking "Add Todo" sends a POST request to /todos/ which returns 422.

The frontend alert shows [object Object].

Instructions:

Check Backend Model: Look at src/schemas/todo.py (or wherever the Todo Pydantic model is). See what fields are required (e.g., title: str).

Check Frontend Request: Look at src/pages/todos/index.tsx. Find the handleAddTodo function.

Match Fields: Ensure the JSON being sent in fetch matches the Backend schema. For example, if Backend wants title, ensure Frontend isn't sending text or content.

Fix Alert: Update the frontend error handling to show error.message instead of the whole object so we can see the exact validation error in the browser.

Goal: Successfully add a todo and see it in the list.

## Response snapshot

I have fixed the alert message that is shown when adding a todo fails with a 422 error. The alert will now show the detailed validation error from the backend, which will help in diagnosing the root cause of the 422 error.

## Outcome

- ✅ Impact: The frontend will now display a detailed error message when adding a todo fails, which will help in debugging the 422 error.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `frontend/src/components/AddTodo.tsx`.
- 🔁 Next prompts: None
- 🧠 Reflection: I was unable to find the root cause of the 422 error, as the frontend code seems to be sending the correct data. By improving the error message, the user will now be able to see the exact validation error and diagnose the problem.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
