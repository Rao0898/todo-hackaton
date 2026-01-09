from fastapi import FastAPI, Depends, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlmodel import Session, SQLModel # Changed to sqlmodel.Session

from .db.session import get_db, engine, create_db_and_tables
from .core.security import get_current_user # Will be used later for auth
from .core.config import settings, logger

app = FastAPI(title=settings.PROJECT_NAME, redirect_slashes=False)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers here (will be created later)
from .api.endpoints import users, auth, todos # Import todos
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(todos.router, prefix="/todos", tags=["todos"])
