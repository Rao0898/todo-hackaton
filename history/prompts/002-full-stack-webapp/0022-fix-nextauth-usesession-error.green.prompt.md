---
id: 0022
title: Fix NextAuth useSession Error
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [next-auth, useSession, SessionProvider]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/pages/_app.tsx
tests:
 - None
---

## Prompt

Context:
This is a Next.js project using NextAuth (pages router).
Backend authentication is working correctly.
The database and API issues are already resolved.

Current Error:
Unhandled Runtime Error:
[next-auth]: `useSession` must be wrapped in a <SessionProvider />

Location:
Error occurs in:
src/pages/todos/index.tsx
Line where `useSession()` hook is used.

Why this error is happening:
The `useSession()` hook is being called in a page component,
but the application is not wrapped with NextAuth’s <SessionProvider>
at the root level (_app.tsx).
NextAuth requires SessionProvider to be present in the component tree.

Task:
1. Identify where the root app component is defined (pages router).
2. Wrap the entire application with <SessionProvider>.
3. Ensure the session is passed correctly via pageProps.
4. Do NOT modify backend code.
5. Do NOT change business logic of existing pages.
6. Fix should be minimal and follow NextAuth best practices.

Reference Fix (expected approach):
- Use `SessionProvider` from `next-auth/react`
- Apply it in `src/pages/_app.tsx`
- Restart the dev server after the fix

Goal:
After the fix:
- useSession() works correctly
- Todos page loads without runtime error
- User session is accessible on the frontend

## Response snapshot

I have fixed the `useSession` error by creating `frontend/src/pages/_app.tsx` and wrapping the application with `SessionProvider`. I have also started the development server.

## Outcome

- ✅ Impact: The application should no longer crash when using the `useSession` hook.
- 🧪 Tests: No new tests were added.
- 📁 Files: Created `frontend/src/pages/_app.tsx`.
- 🔁 Next prompts: None
- 🧠 Reflection: The fix was straightforward and followed the user's instructions.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
