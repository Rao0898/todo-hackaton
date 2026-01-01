<!-- Sync Impact Report:
Version change: None (initial creation) -> 0.1.0
List of modified principles:
  - Initial Principles
Added sections:
  - Development Environment
  - Phase 1: In-memory CLI Todo
Removed sections:
  - None
Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
  - .specify/commands/sp.adr.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.analyze.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.checklist.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.clarify.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.constitution.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.git.commit_pr.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.implement.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.phr.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.plan.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.reverse-engineer.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.specify.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.tasks.toml ⚠ pending (check for CLAUDE references)
  - .specify/commands/sp.taskstoissues.toml ⚠ pending (check for CLAUDE references)
Follow-up TODOs: None
-->
# The Evolution of Todo Constitution

## Core Principles

### I. Spec-driven Development
Spec-driven development only (spec → plan → tasks → implement). This ensures a structured and predictable development process, reducing ambiguity and rework.

### II. AI Agent is Sole Implementer
 An AI coding agent (e.g., Gemini CLI, Claude Code) is the sole implementer; no manual boilerplate coding. This enforces automation and consistency in code generation.

### III. No Features Beyond Approved Specs
No features, tools, or architecture beyond approved specs. This maintains project scope and prevents feature creep, ensuring focused development.

### IV. Ask for Clarification
Ask for clarification if requirements are unclear. This promotes clear communication and reduces assumptions, leading to more accurate implementations.

## Code Standards

*   Clean, modular Python (3.13+ preferred).
*   Clear naming, Single Responsibility Principle (SRP), validation, and error handling.
*   Deterministic, user-friendly CLI behavior.

These standards ensure high code quality, maintainability, and a consistent user experience.

## Project Structure

*   One Constitution.md for all phases.
*   Phase-specific rules belong in specs.
*   README.md, CLAUDE.md, and spec history are mandatory.

This structure provides a clear organizational framework for the project documentation and development artifacts.

## Development Environment

*   WSL 2 (Ubuntu) required.
*   UV for Python environment management.

These environment requirements standardize the development setup, minimizing "it works on my machine" issues.

## Phase 1: In-memory CLI Todo

*   In-memory CLI Todo only.
*   Features: Add, View, Update, Delete, Complete/Incomplete.
*   No databases or external services.

This defines the initial scope and constraints for the first phase of the project, focusing on core CLI functionality without external dependencies.

## Governance

Constitution is the supreme authority; Amendments require documentation, approval, migration plan; All PRs/reviews must verify compliance; Complexity must be justified.

**Version**: 0.1.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30