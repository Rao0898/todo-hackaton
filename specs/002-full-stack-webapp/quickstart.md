# Quickstart Guide: Phase 2 Full-Stack Web App

This guide provides instructions to set up, run, and test the Phase 2 Full-Stack Web Application (FastAPI backend, Next.js frontend) locally.

## 1. Backend Setup (FastAPI)

The backend is a FastAPI application that interacts with a PostgreSQL database.

### Required Environment Variables

Create a file named `.env` in the `backend/` directory with the following variables:

*   **`DATABASE_URL`**: Connection string for your PostgreSQL database. For Neon DB, this typically looks like `postgresql://user:password@host/dbname`.
    *   **Purpose**: Used by the backend to connect to the PostgreSQL database for storing user and todo data.
*   **`BETTER_AUTH_SECRET`**: A strong, secret key used for signing and verifying JSON Web Tokens (JWTs). This should be a long, random string.
    *   **Purpose**: Essential for the security of user authentication. The backend uses this secret to verify the authenticity of JWTs issued by the frontend.
*   **`DEBUG_MODE`**: Set to `True` for development, `False` for production.
    *   **Purpose**: Controls FastAPI's debug behavior.

### Example `.env` file

```
DATABASE_URL="postgresql://user:password@aws-0-us-east-1.pooler.neon.tech/dbname"
BETTER_AUTH_SECRET="your_very_strong_and_random_secret_key_here"
DEBUG_MODE="True"
```

### Commands to Run the Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend/
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    python3.13 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the FastAPI server locally:**
    ```bash
    uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The `--reload` flag enables auto-reloading on code changes, useful for development.

### Backend Base URL

Once running, the backend API will be accessible at: `http://localhost:8000`

---

## 2. Frontend Setup (Next.js)

The frontend is a Next.js application that consumes the FastAPI backend.

### Required Environment Variables

Create a file named `.env.local` in the `frontend/` directory with the following variables:

*   **`NEXTAUTH_URL`**: The base URL of your Next.js application.
    *   **Purpose**: Used by NextAuth.js for callback URLs and session management.
*   **`NEXTAUTH_SECRET`**: A strong, secret key for NextAuth.js. This should be different from `BETTER_AUTH_SECRET`.
    *   **Purpose**: Used by NextAuth.js to encrypt the NextAuth.js session cookie.
*   **`BETTER_AUTH_SECRET`**: **MUST BE THE SAME AS THE BACKEND'S `BETTER_AUTH_SECRET`**. This is used by Auth.js to sign the JWT.
    *   **Purpose**: The shared secret between frontend (for JWT signing) and backend (for JWT verification).
*   **`BACKEND_API_BASE_URL`**: The base URL of your FastAPI backend.
    *   **Purpose**: Used by the frontend to make API requests to the backend.

### Example `.env.local` file

```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="another_very_strong_and_random_secret_key_for_nextauth"
BETTER_AUTH_SECRET="your_very_strong_and_random_secret_key_here" # Must match backend
BACKEND_API_BASE_URL="http://localhost:8000"
```

### Commands to Run the Frontend

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend/
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the frontend locally:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Frontend URL

Once running, the frontend application will be accessible at: `http://localhost:3000`

---

## 3. Authentication Flow (High-level)

The application uses a "Better Auth" (Auth.js/NextAuth.js) based JWT authentication mechanism.

1.  **User Login/Signup on Frontend**: When a user logs in or signs up via the Next.js frontend, Auth.js handles the authentication process. Upon successful authentication, Auth.js generates a JSON Web Token (JWT).
2.  **JWT Generation and Storage**: Auth.js, using the `BETTER_AUTH_SECRET` provided in `.env.local`, signs the JWT. This JWT is typically stored securely (e.g., in an HTTP-only cookie or local storage) by Auth.js within the browser.
3.  **Sending JWT to Backend**: For any subsequent authenticated API requests from the frontend to the FastAPI backend (e.g., fetching or managing todos), the frontend extracts this JWT and includes it in the `Authorization` header of the HTTP request.
    *   **Required Header Format**: `Authorization: Bearer <your_jwt_token_here>`
4.  **Backend Verification**: The FastAPI backend, using its own `BETTER_AUTH_SECRET` (which **must** match the frontend's secret), intercepts the incoming request. It then verifies the signature and validity of the JWT present in the `Authorization` header.
    *   If the JWT is valid and unexpired, the request is authenticated, and the backend can identify the user from the token's payload.
    *   If the JWT is invalid, expired, or missing, the backend rejects the request, typically with a `401 Unauthorized` status.

---

## 4. API Testing Instructions

You can test the protected API endpoints using the authenticated frontend or directly via `curl`/Postman.

### Using the Authenticated Frontend

1.  Ensure both the backend and frontend servers are running as described in sections 1 and 2.
2.  Open your browser to `http://localhost:3000`.
3.  Sign up for a new account or log in with existing credentials.
4.  Navigate to the todo management page. Actions like creating, viewing, updating, or deleting todos will automatically send authenticated requests to the backend. Observe network requests in your browser's developer tools to see the `Authorization: Bearer` header in action.

### Using `curl` or Postman (Direct API Calls)

To test directly, you'll need a valid JWT. You can obtain one by logging in through the frontend and inspecting the network requests (or developer console if Auth.js exposes it).

1.  **Log in via the frontend** (`http://localhost:3000`) and capture a valid JWT from a successful authentication response or from the browser's application storage.

2.  **Example `curl` request to a protected endpoint (e.g., get all todos):**

    ```bash
    curl -X GET \
      http://localhost:8000/api/v1/todos \
      -H 'Authorization: Bearer <YOUR_ACTUAL_JWT_TOKEN_HERE>' \
      -H 'accept: application/json'
    ```
    Replace `<YOUR_ACTUAL_JWT_TOKEN_HERE>` with a real, valid JWT.

3.  **Example `curl` request to create a todo:**

    ```bash
    curl -X POST \
      http://localhost:8000/api/v1/todos \
      -H 'Authorization: Bearer <YOUR_ACTUAL_JWT_TOKEN_HERE>' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/json' \
      -d 
        '{
              "title": "My New Todo Item",
              "description": "This is a description for my new todo."
            }'
    ```
    Note: The description field might be optional or structured differently based on the actual API.

---

## 5. Common Issues & Fixes

### Missing Environment Variables

*   **Issue**: `KeyError` or configuration errors during startup (backend), or build failures/runtime errors (frontend) indicating missing secrets or URLs.
*   **Fix**: Double-check your `.env` (backend) and `.env.local` (frontend) files. Ensure all required environment variables are defined with correct values and that the files are placed in the correct directories. Remember to restart the respective server after modifying `.env` files.

### Invalid JWT / 401 Unauthorized Errors

*   **Issue**: Requests to protected API endpoints return `401 Unauthorized` errors, even when logged in via the frontend.
*   **Fixes**:
    *   **`BETTER_AUTH_SECRET` Mismatch**: Ensure the `BETTER_AUTH_SECRET` environment variable is **identical** in both the backend's `.env` file and the frontend's `.env.local` file. Any mismatch will cause token verification to fail.
    *   **Expired Token**: If you're using `curl`/Postman, the JWT token you're using might have expired. Log in again via the frontend to obtain a fresh token.
    *   **Incorrect Header**: Verify the `Authorization` header is correctly formatted as `Authorization: Bearer <token>`.
    *   **Token Not Sent**: Ensure your frontend code is correctly attaching the `Authorization` header to all requests to protected backend routes.

### Database Connection Issues

*   **Issue**: Backend fails to start or reports connection errors to PostgreSQL.
*   **Fixes**:
    *   **`DATABASE_URL` Format**: Verify that your `DATABASE_URL` in `backend/.env` is correctly formatted and points to your Neon DB instance.
    *   **Network Access**: Ensure your local machine has network access to the Neon DB. Check firewall rules or VPN connections if necessary.
    *   **Credentials**: Confirm that the username and password in your `DATABASE_URL` are correct and have appropriate permissions for the database.
    *   **Database Migrations**: Ensure any necessary database migrations have been applied. (This quickstart assumes the database schema is already set up or will be handled by the application on startup).
    *   **Database Server Status**: Check if your Neon DB instance is active and running.