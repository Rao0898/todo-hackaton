---
id: 0005
title: Explain Python Path and ModuleNotFoundError
stage: explainer
date: 2026-01-01
surface: agent
model: gemini-cli
feature: 001-cli-todo
branch: 001-cli-todo
user: rao
command: 
labels: ["python", "module-not-found", "pythonpath"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/cli/main.py
tests:
  - none
---

## Prompt

when i run this command so this error is coming whyy
rao@DESKTOP-RH758QA:/mnt/d/todo-hackaton/todo-app$ python3 src/cli/main.py
Traceback (most recent call last):
  File "/mnt/d/todo-hackaton/todo-app/src/cli/main.py", line 2, in <module>
    from src.services.todo_service import TodoService
ModuleNotFoundError: No module named 'src'
rao@DESKTOP-RH758QA:/mnt/d/todo-hackaton/todo-app$ python3 src/cli/main.py

Traceback (most recent call last):
  File "/mnt/d/todo-hackaton/todo-app/src/cli/main.py", line 2, in <module>
    from services.todo_service import TodoService
ModuleNotFoundError: No module named 'services'
rao@DESKTOP-RH758QA:/mnt/d/todo-hackaton/todo-app$
rao@DESKTOP-RH758QA:/mnt/d/todo-hackaton/todo-app$ python3 -m cli.main
/usr/bin/python3: Error while finding module specification for 'cli.main' (ModuleNotFoundError: No module named 'cli')
rao@DESKTOP-RH758QA:/mnt/d/todo-hackaton/todo-app$   when i run this command so this error is coming whyy

## Response snapshot

This is a very common issue in Python when using a `src` directory layout. Let's break down why your commands are failing and how to fix it.

### The Problem: Python's Search Path (`sys.path`)

When you run a Python script, it has a list of directories where it looks for modules to import. This is called the `sys.path`. The problem is that in each of your attempts, the `src` directory (where your actual code lives) is not being included correctly in this path.

1.  **`python3 src/cli/main.py`**
    *   When you run this, Python adds the script's directory (`/mnt/d/todo-hackaton/todo-app/src/cli`) to the path. It does **not** add the project root.
    *   Your code tries `from services.todo_service import TodoService`. Python looks for a `services` module inside `src/cli`, can't find it, and fails with `ModuleNotFoundError: No module named 'services'`.

2.  **`python3 -m cli.main`**
    *   The `-m` flag tells Python to run a module. It adds your **current directory** (`/mnt/d/todo-hackaton/todo-app`) to the path.
    *   Python then looks for a module named `cli` directly inside your project root. It can't find it because your `cli` module is inside `src`. This results in `ModuleNotFoundError: No module named 'cli'`.

### The Solution: Run as a Module from the Project Root

To fix this, you need to do two things:
1.  Stay in your project's root directory (`/mnt/d/todo-hackaton/todo-app`).
2.  Tell Python to add the `src` directory to its search path.

The correct way to run your application from the project root is:

```bash
PYTHONPATH=src python3 -m cli.main
```

**Why this works:**

*   `PYTHONPATH=src`: This is an environment variable that temporarily tells Python, "In addition to your regular search locations, also look for modules inside the `src` directory."
*   `python3 -m cli.main`: Now that Python knows to look inside `src`, it can correctly find and run the `main` module within the `cli` package.

This is the standard way to run applications that use a `src` layout. Your code's import statements (`from services.todo_service import TodoService`) are correct for this structure. The issue was only in how the script was being executed.

## Outcome

- ✅ Impact: Explained the root cause of the ModuleNotFoundError and provided the correct command to run the application.
- 🧪 Tests: None.
- 📁 Files: None.
- 🔁 Next prompts: Expecting the user to try the new command.
- 🧠 Reflection: This is a classic Python `sys.path` issue. My explanation should be clear enough. The key is to make the user understand the difference between running a script directly and running it as a module with `-m`.

## Evaluation notes (flywheel)

- Failure modes observed: User confusion about Python's import system.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment: null
