from sqlmodel import create_engine, Session, SQLModel
from ..core.config import settings
from ..models import todo, user # Import models to create tables

DATABASE_URL = settings.DATABASE_URL
if DATABASE_URL is None:
    DATABASE_URL = "sqlite:///./test.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_db():
    with Session(engine) as session:
        yield session
