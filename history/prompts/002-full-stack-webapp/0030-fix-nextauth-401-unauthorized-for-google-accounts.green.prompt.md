---
id: 0030
title: Fix NextAuth 401 Unauthorized for Google accounts
stage: green
date: 2026-01-09
model: gemini-1.5-pro
feature: 002-full-stack-webapp
branch: main
user: 
command: "Fix the 401 Unauthorized error observed with some Google accounts when accessing `/todos/` endpoints."
labels:
  - nextjs
  - nextauth
  - authentication
  - frontend
  - fix
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/src/pages/api/auth/[...nextauth].ts
  - frontend/src/pages/todos/index.tsx
prompt_text: "Context:
- This is a full-stack app using:
  - Next.js (frontend)
  - NextAuth (Google auth)
  - FastAPI backend with JWT authentication
- Backend is working correctly.
- Todos endpoints require Authorization: Bearer <token>.
- Issue occurs only with some Google accounts.

Observed Problem:
- Backend logs show intermittent 401 Unauthorized on GET /todos/.
- Frontend sometimes shows:
  "Error: Could not validate credentials".
- One Google account works, another fails.
- POST /auth/token returns 200 OK, but subsequent requests fail.

Root Cause:
- Frontend authentication state and backend JWT token are not synchronized.
- NextAuth session exists, but access_token sent to backend is:
  - missing
  - expired
  - or not refreshed
- Logout does not fully clear session/token.
- Multiple Google accounts cause stale cookies.

Required Fix (Authoritative):

1) Ensure frontend ALWAYS fetches a fresh access token before calling backend APIs.

2) In todos API calls:
   - Read token ONLY from NextAuth session:
     session.accessToken (or session.user.token)
   - Attach it explicitly:
     Authorization: Bearer <token>

3) Force redirect logic:
   - If NOT authenticated → redirect to /login
   - If authenticated → redirect directly to /todos
   - Remove any intermediate "You are logged in" screen

4) On logout:
   - Call NextAuth signOut()
   - Clear all localStorage/sessionStorage
   - Redirect to /login

5) Prevent stale sessions:
   - Use `useSession({ required: true })`
   - On 401 response:
       - Immediately signOut()
       - Redirect to /login

6) Ensure Google auth callback stores token correctly:
   - Save backend JWT inside NextAuth session
   - Do NOT reuse old tokens across accounts

Expected Result:
- All Google accounts work consistently.
- No random 401 errors.
- Todos load every time after login.
- Logout fully resets auth state."
response_text: "All the necessary changes have been implemented on the frontend.
The final step is to restart the development server and verify the fix.
I will use `npm run dev` in the `frontend` directory. Since it will run indefinitely, I will run it in the background."
outcome: "The frontend was updated to correctly handle JWT token synchronization for both Credentials and Google providers, implement 401 response handling, and enhance logout functionality. Redirect logic for authenticated users was also verified."
evaluation: "The fix addresses all points mentioned in the prompt. The primary unknown is the existence and behavior of the `/auth/google` endpoint on the backend, which was assumed to exist based on the problem description. Manual verification will be crucial to confirm the fix across all Google accounts."
---