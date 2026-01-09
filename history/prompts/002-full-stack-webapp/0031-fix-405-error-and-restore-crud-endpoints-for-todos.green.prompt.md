---
id: 0031
title: Fix 405 Error and Restore CRUD Endpoints for Todos
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [backend, fastapi, crud, 405]
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

Task: Fix 405 Method Not Allowed in backend/src/api/endpoints/todos.py.

Context: > - The server starts, but GET /todos/ returns 405.

This means the @router.get("/") endpoint is either missing, misconfigured, or shadowed by another route.

Instructions:

Rewrite backend/src/api/endpoints/todos.py with all standard CRUD operations.

Ensure correct Imports:

Python

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...schemas.todo import Todo, TodoCreate, TodoUpdate
from ...core.security import get_current_user
from ...models.todo import Todo as TodoModel
Define Router: router = APIRouter()

Add GET endpoint: > @router.get("/", response_model=List[Todo]) Ensure it filters by owner_id=current_user.id.

Add POST, PUT, DELETE: Ensure they all use current_user.id and the correct schema.

CORS: Double check main.py still has CORS enabled so the frontend can talk to these routes.

Goal: Frontend should be able to fetch todos (GET) and update them (PUT) without 405 or 422 errors.

## Response snapshot

I have fixed the `405 Method Not Allowed` error by rewriting `backend/src/api/endpoints/todos.py` to correctly implement all standard CRUD operations (`GET`, `POST`, `PUT`, `DELETE`). The previous version of the file had incorrect endpoint definitions. I also verified that CORS is enabled in `main.py`.

## Outcome

- ✅ Impact: The backend now correctly handles all CRUD operations for todos, resolving the 405 error and restoring full functionality.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `backend/src/api/endpoints/todos.py`.
- 🔁 Next prompts: None
- 🧠 Reflection: This task involved correcting a significant regression where the API endpoints for todos were misconfigured. A full rewrite based on a clear definition of the required CRUD operations was the most effective solution.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
