---
id: 0023
title: Fix Next.js globals.css import error
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 002-full-stack-webapp
branch: 002-full-stack-webapp
user: user
command: None
labels: [next.js, css, import, module-resolution]
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
This is a Next.js project using the pages router and NextAuth.
Authentication logic is already correct.
SessionProvider has been added to fix the useSession error.

Current Error:
Build-time error in frontend:

Module not found: Can't resolve '../styles/globals.css'

Location:
File: src/pages/_app.tsx
Line: import '../styles/globals.css';

Why this error is happening:
The project structure does NOT contain a `src/styles/globals.css` file.
Either:
- The styles folder is located elsewhere (e.g. src/app/globals.css or styles/globals.css)
- OR the project does not use a global CSS file at all
- OR the import path is incorrect for the current folder structure

Next.js fails the build because _app.tsx imports a file that does not exist.

Task:
1. Inspect the actual project folder structure.
2. Locate the correct global CSS file if it exists.
3. Fix the import path in `src/pages/_app.tsx` accordingly.
4. If no global CSS file exists:
   - Remove the import safely OR
   - Create a minimal globals.css file in the correct location.
5. Do NOT modify authentication logic.
6. Do NOT change backend code.
7. Apply the fix using Next.js best practices.

Reference Correction (expected solutions):
- If CSS exists at `src/app/globals.css`, update import path correctly
- If CSS exists at `styles/globals.css`, update import path correctly
- If no global CSS exists, remove the import to prevent build failure

Goal:
- Frontend should build successfully
- No module resolution errors
- Login and pages should load normally
- SessionProvider should remain intact

## Response snapshot

I have fixed the `Module not found` error for `globals.css` by correcting the import path in `frontend/src/pages/_app.tsx` from `../styles/globals.css` to `../../styles/globals.css`.

## Outcome

- ✅ Impact: The Next.js frontend should now build successfully without module resolution errors related to `globals.css`.
- 🧪 Tests: No new tests were added.
- 📁 Files: Modified `frontend/src/pages/_app.tsx`.
- 🔁 Next prompts: None
- 🧠 Reflection: The fix was a direct correction of an incorrect relative path based on the actual file structure.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
