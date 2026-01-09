# Backend API

This is the backend API for the Full-Stack Todo application, built with FastAPI.

## Features

- User authentication (signup, login)
- JWT-based authorization
- CRUD operations for todo items

## Setup

1.  **Create a virtual environment and install dependencies**:
    ```bash
    cd backend
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    ```

2.  **Create a `.env` file**:
    Copy `backend/.env.example` to `backend/.env` and update the values.

3.  **Run the database migrations (if applicable)**:
    (Not yet implemented in this phase, will be added in future phases)

4.  **Run the application**:
    ```bash
    uvicorn src.main:app --reload --port 8000
    ```

The API will be accessible at `http://localhost:8000`.

## API Endpoints

Refer to `specs/002-full-stack-webapp/contracts/openapi.json` for the OpenAPI specification.
You can also access the interactive API documentation (Swagger UI) at `http://localhost:8000/docs` once the application is running.
