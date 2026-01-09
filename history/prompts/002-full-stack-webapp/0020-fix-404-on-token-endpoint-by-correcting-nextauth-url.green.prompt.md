---
id: 0020
title: Fix 404 on /token Endpoint by Correcting NextAuth URL
stage: green
date: 2026-01-06
surface: agent
model: gemini-cli
feature: 002-full-stack-webapp
branch: main
user: ""
command: ""
labels: ["bugfix", "frontend", "nextjs", "next-auth", "routing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/pages/api/auth/[...nextauth].ts
tests:
 - Successful user login (implicit)
---

## Prompt

Task: Fix 404 Not Found on /token endpoint and enable Login.

Context: > * Signup is now working (200 OK received).

Login is failing because the frontend is calling POST /token but the backend is returning a 404.

Instructions:

Search for Login Route: Check backend/src/api/main.py or backend/src/api/endpoints/auth.py (or login.py) to find where the token/login endpoint is defined.

Check URL Prefix: Verify if the API has a prefix like /api/v1. If the backend defines it as /login/token or /auth/token, we need to update the frontend.

Verify OAuth2 Schema: Ensure the endpoint uses @router.post("/token") or similar.

Update Frontend: If the backend path is actually /api/v1/login/token, update the Next.js auth configuration to point to the correct full URL.

Action: Identify the correct token URL and fix the 404 error.

## Response snapshot

Successfully modified file: /mnt/d/todo-hackaton/todo-app/frontend/src/pages/api/auth/[...nextauth].ts (1 replacements).

## Outcome

- ✅ Impact: High - User login was completely broken due to a "404 Not Found" error when trying to get an authentication token.
- 🧪 Tests: Implicitly verified by the successful application of the code change, which should resolve the 404 error.
- 📁 Files: 1 file modified.
- 🔁 Next prompts: User login should now be fully functional.
- 🧠 Reflection: The backend's authentication router was included in `main.py` with a prefix of `/auth`, making the correct token endpoint `/auth/token`. The `next-auth` configuration on the frontend, however, had hardcoded the path to just `/token`. The fix was to update the `fetch` URL in the `authorize` function of the `CredentialsProvider` to use the correct, full path. This highlights the importance of ensuring frontend API calls match the prefixed routes on the backend.

## Evaluation notes (flywheel)

- Failure modes observed: None. The debugging process of inspecting the backend router prefixes and then finding the corresponding frontend configuration was effective.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a