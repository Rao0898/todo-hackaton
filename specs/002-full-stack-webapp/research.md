# Research: Phase 2 Full-Stack Web App

This document records the research and decisions made to resolve the "NEEDS CLARIFICATION" items from the `plan.md`.

## 1. Frontend JWT Library ("Better Auth")

*   **Task**: Research and recommend a JWT library for the Next.js frontend that is easy to use, secure, and well-maintained.

*   **Decision**: `Auth.js` (formerly `NextAuth.js`) will be used for authentication.

*   **Rationale**: `Auth.js` is a complete authentication solution specifically designed for Next.js. It handles JWT generation, verification, and management with built-in security best practices like using `HttpOnly` cookies and CSRF protection. This significantly simplifies the implementation of a secure authentication system.

*   **Alternatives considered**: `jsonwebtoken` (lower-level control), `Auth0`/`Clerk` (enterprise-grade), `Lucia Auth` (lightweight).

## 2. Testing Frameworks

*   **Task**: Recommend testing frameworks for both the FastAPI backend and the Next.js frontend.

*   **Decision**: 
    *   **Backend (FastAPI)**: `pytest` with `TestClient` and `httpx`.
    *   **Frontend (Next.js)**: `Jest` with `React Testing Library` for unit/integration tests, and `Cypress` for end-to-end tests.

*   **Rationale**: 
    *   `pytest` is the standard and most recommended testing framework for FastAPI, and `TestClient` is built-in for testing API endpoints.
    *   `Jest` and `React Testing Library` are the de-facto standard for testing React applications, providing a great developer experience and encouraging best practices. `Cypress` is a powerful and easy-to-use tool for end-to-end testing that will ensure the application works as expected from a user's perspective.

*   **Alternatives considered**: 
    *   **Backend**: `unittest` (built-in Python library).
    *   **Frontend**: `Vitest` (a newer alternative to Jest), `Playwright` (an alternative to Cypress).
