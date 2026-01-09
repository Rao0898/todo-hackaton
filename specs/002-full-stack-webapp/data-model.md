# Data Model: Full-Stack Todo App

This document outlines the data models for the User and TodoItem entities, as defined in the feature specification.

## User

Represents a registered user of the application.

| Attribute | Type | Description | Constraints |
|---|---|---|---|
| `id` | UUID | Unique identifier for the user. | Primary Key, Auto-generated |
| `email` | String | User's email address. | Required, Unique |
| `hashed_password` | String | User's hashed password. | Required |

### Relationships

- Has many `TodoItem`s.

## TodoItem

Represents a single todo task created by a user.

| Attribute | Type | Description | Constraints |
|---|---|---|---|
| `id` | UUID | Unique identifier for the todo item. | Primary Key, Auto-generated |
| `title` | String | The content of the todo item. | Required |
| `completed` | Boolean | The completion status of the todo item. | Required, Defaults to `false` |
| `owner_id` | UUID | Foreign key referencing the `User` who owns this item. | Required, Foreign Key |

### Relationships

- Belongs to one `User`.
