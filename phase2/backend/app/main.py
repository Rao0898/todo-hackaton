from fastapi import FastAPI

app = FastAPI(title="Todo App")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo App API"}
