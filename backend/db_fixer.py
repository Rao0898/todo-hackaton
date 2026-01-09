import sys
import os
from sqlalchemy import inspect
from sqlmodel import SQLModel
from sqlalchemy.future import create_engine

# Add current directory to sys.path to allow importing src
sys.path.append(os.getcwd())
sys.path.append(os.path.join(os.getcwd(), 'src'))

from src.db.session import engine
from src.models.user import User

def fix_database_schema():
    print("Starting database schema fix...")

    inspector = inspect(engine)
    table_names = inspector.get_table_names()

    if "users" not in table_names:
        print(" 'users' table not found. Creating all tables.")
        SQLModel.metadata.create_all(engine)
        print("All tables created.")
    else:
        columns = inspector.get_columns("users")
        column_names = [col['name'] for col in columns]

        if "hashed_password" not in column_names:
            print(" 'hashed_password' column not found in 'users' table. Dropping and recreating all tables.")
            SQLModel.metadata.drop_all(engine)
            SQLModel.metadata.create_all(engine)
            print("All tables dropped and recreated.")
        else:
            print(" 'users' table and 'hashed_password' column are present. No schema fix needed.")

    # Verify after fix
    inspector = inspect(engine)
    if "users" in inspector.get_table_names():
        columns_after_fix = inspector.get_columns("users")
        column_names_after_fix = [col['name'] for col in columns_after_fix]
        print(f"Current columns in 'users' table: {column_names_after_fix}")
        if "hashed_password" in column_names_after_fix:
            print("Schema fix successful: 'hashed_password' column is now present.")
        else:
            print("ERROR: 'hashed_password' column is still missing after fix attempt.")
    else:
        print("ERROR: 'users' table is still missing after fix attempt.")

if __name__ == "__main__":
    fix_database_schema()
