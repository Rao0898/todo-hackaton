# Quickstart: CLI Todo App

## Overview

This is a simple, command-line interface (CLI) application for managing a todo list. It's built with Python and stores all tasks in memory, meaning your todo list will be reset every time you close the application.

This project was built as Phase 1 of "The Evolution of Todo" and demonstrates core functionalities in a clean, modular structure.

## Features

-   **Add a todo:** Create a new task with a title and an optional description.
-   **List all todos:** View all the tasks in your list, including their ID, title, description, and completion status.
-   **Update a todo:** Modify the title or description of an existing task.
-   **Delete a todo:** Remove a task from the list.
-   **Mark as Complete/Incomplete:** Change the status of a task.

## Prerequisites

-   Python 3.13 or higher.

## How to Run the Application

This application uses a `src` directory layout, so you need to run it as a Python module from the root of the project directory.

1.  Open your terminal.
2.  Navigate to the project's root directory: `/mnt/d/todo-hackaton/todo-app`.
3.  Run the application using the following command:

    ```bash
    PYTHONPATH=src python3 -m cli.main [COMMAND]
    ```

    **Explanation:**
    *   `PYTHONPATH=src`: This temporarily tells Python to look for the application's code inside the `src` folder.
    *   `python3 -m cli.main`: This executes the main application module.
    *   `[COMMAND]`: This is where you will enter the specific commands to interact with the app (see below).

    If you run the command without any arguments, it will display the help message.

    ```bash
    PYTHONPATH=src python3 -m cli.main
    ```

## Available Commands

Here are the commands you can use to manage your todos.

### Add a new todo

```bash
PYTHONPATH=src python3 -m cli.main add "Your Task Title" --description "Optional description here"
```
**Example:**
```bash
PYTHONPATH=src python3 -m cli.main add "Buy milk" --description "Get 2% milk from the store"
```

### List all todos

```bash
PYTHONPATH=src python3 -m cli.main list
```

### Update an existing todo

You must provide the ID of the todo you want to update.

```bash
PYTHONPATH=src python3 -m cli.main update <ID> --title "New Title" --description "New Description"
```
**Example:**
```bash
PYTHONPATH=src python3 -m cli.main update 1 --title "Buy groceries"
```

### Delete a todo

```bash
PYTHONPATH=src python3 -m cli.main Pdelete <ID>
```
**Example:**
```bash
PYTHONPATH=src python3 -m cli.main delete 2
```

### Mark a todo as complete

```bash
PYTHONPATH=src python3 -m cli.main complete <ID>
```
**Example:**
```bash
PYTHONPATH=src python3 -m cli.main complete 1
```

### Mark a todo as incomplete

```bash
PYTHONPATH=src python3 -m cli.main incomplete <ID>
```
**Example:**
```bash
PYTHONPATH=src python3 -m cli.main incomplete 1
```
