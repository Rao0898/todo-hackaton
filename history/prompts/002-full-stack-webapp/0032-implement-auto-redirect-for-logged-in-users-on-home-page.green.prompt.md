---
id: 0032
title: Implement Auto-Redirect for Logged-in Users on Home Page
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [frontend, nextjs, next-auth, redirect]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/app/page.tsx
tests:
 - None
---

## Prompt

Task: Implement Auto-Redirect from Home to Todos for logged-in users.

Context:

When a user is logged in and visits http://localhost:3000, they see a "Welcome" screen with a logout button.

Better Practice: If the session exists, the user should be automatically redirected to /todos.

Instructions:

Modify src/pages/index.tsx:

Use useSession() to check the user's status.

Use useEffect() and useRouter() to check if status === "authenticated".

If authenticated, call router.push('/todos').

Loading State: Show a simple loading spinner or text while checking the session so the "Logout" button doesn't flash on the screen.

Non-Logged In Users: If not authenticated, the page should show the "Login / Sign Up" options or redirect to /login.

Goal: Logged-in users should never see the landing page; they should land directly on their Todo list.

## Response snapshot

I have implemented the auto-redirect logic for logged-in users in `frontend/src/app/page.tsx`.

*   **Redirect Logic:** I added a `useEffect` hook that watches the `session.status`. If the user is `authenticated`, `router.push('/todos')` is called to redirect them to their todo list. This ensures logged-in users bypass the landing page, as per the task.
*   **Loading State:** A `if (status === 'loading')` check was added to display "Loading session..." while NextAuth is determining the session status. This prevents the "Logout" button from briefly appearing before the redirect, improving the user experience.
*   **Router Import:** Changed `useRouter` import to `next/navigation` to align with the App Router usage in `frontend/src/app/page.tsx`.

## Outcome

- ✅ Impact: Logged-in users are now automatically redirected from the home page to the todos page, improving UX.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `frontend/src/app/page.tsx`.
- 🔁 Next prompts: None
- 🧠 Reflection: The primary challenge was confirming the correct file to modify due to the "pages router" context conflicting with the presence of `app/page.tsx`. Once clarified, the implementation was straightforward.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
