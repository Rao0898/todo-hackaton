---
id: 0028
title: Add Edit and Delete Functionality to Todos Page
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [frontend, react, nextjs, crud]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/pages/todos/index.tsx
tests:
 - None
---

## Prompt

You are working on a full-stack Todo application.

Backend:
- FastAPI is already implemented and working
- Available endpoints (confirmed via /docs):
  - GET    /todos/
  - POST   /todos/
  - PUT    /todos/{id}
  - DELETE /todos/{id}
- Auth is JWT based and already functional
- Backend runs on http://127.0.0.1:8000

Frontend:
- Next.js 14 (pages router)
- NextAuth authentication already working
- Todos page exists at: src/pages/todos/index.tsx
- Todos are already being READ and CREATED successfully
- Issue: Update and Delete functionality is missing in the UI

TASK:
1. Modify `src/pages/todos/index.tsx`
2. Add the following features:
   - A **Delete button** for each todo that calls `DELETE /todos/{id}`
   - An **Edit button** for each todo that:
     - Opens a prompt/input
     - Calls `PUT /todos/{id}` with updated title
3. Ensure:
   - JWT access token is sent in Authorization header
   - After create/update/delete, todos list refreshes automatically
   - Proper error handling (console + UI alert)
4. Do NOT break existing Add / Read logic
5. Use clean React state management with `useState` and `useEffect`
6. Return:
   - Full updated code of `src/pages/todos/index.tsx`
   - No pseudocode, only working production-ready code
7. Explain briefly what was added and why (short explanation)

IMPORTANT:
- Backend is correct, do NOT change backend code
- Focus only on frontend todos page

## Response snapshot

I have updated `frontend/src/pages/todos/index.tsx` with the requested features.

I've added "Edit" and "Delete" buttons to each todo item in the list.

*   **Delete Functionality:** A `handleDelete` function has been added. When the "Delete" button is clicked, it asks for confirmation and then sends a `DELETE` request to the backend.
*   **Edit Functionality:** A `handleEdit` function has been added. When the "Edit" button is clicked, it opens a prompt to get the new title from the user. It then sends a `PUT` request to the backend with the updated title.
*   **UI Refresh:** After any successful delete or update operation, the list of todos is automatically refreshed.
*   **Error Handling:** Both new functions include error handling to show an alert if the operation fails.
*   **Component Structure:** To follow the instruction of modifying only one file, I've inlined the rendering of the todo item into `TodosPage.tsx` and added the new buttons there.

## Outcome

- ✅ Impact: The user can now edit and delete todos from the UI.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `frontend/src/pages/todos/index.tsx`.
- 🔁 Next prompts: None
- 🧠 Reflection: The task involved adding standard CRUD operations to a React component. The use of `useCallback` is important for performance, especially when passing functions to child components, although in this case, the rendering was inlined. The most important part was to ensure the API requests were correct and that the UI was refreshed after each action.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
