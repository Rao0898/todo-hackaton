---
id: 0001
title: Create Initial Project Constitution
stage: constitution
date: 2025-12-30
surface: agent
model: unknown
feature: none
branch: unknown
user: rao
command: /sp.constitution /sp.constitution Create a single Constitution for the hackathon project “The Evolution of Todo”, governing ALL phases. Principles: • Spec-driven development only (spec → plan → tasks → implement). • Claude Code is the sole implementer; no manual boilerplate coding. • No features, tools, or architecture beyond approved specs. • Ask for clarification if requirements are unclear. Standards: • Clean, modular Python (3.13+ preferred). • Clear naming, SRP, validation, and error handling. • Deterministic, user-friendly CLI behavior. Structure: • One Constitution.md for all phases. • Phase-specific rules belong in specs. • README.md, CLAUDE.md, and spec history are mandatory. Environment: • WSL 2 (Ubuntu) required. • UV for Python environment management. Phase 1 Rule: • In-memory CLI Todo only. • Features: Add, View, Update, Delete, Complete/Incomplete. • No databases or external services. This Constitution is the supreme authority. Generate a concise, professional Constitution.md.
labels: ["documentation", "constitution"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
tests:

---

## Prompt

/sp.constitution /sp.constitution

Create a single Constitution for the hackathon project
“The Evolution of Todo”, governing ALL phases.

Principles:
• Spec-driven development only (spec → plan → tasks → implement).
• Claude Code is the sole implementer; no manual boilerplate coding.
• No features, tools, or architecture beyond approved specs.
• Ask for clarification if requirements are unclear.

Standards:
• Clean, modular Python (3.13+ preferred).
• Clear naming, SRP, validation, and error handling.
• Deterministic, user-friendly CLI behavior.

Structure:
• One Constitution.md for all phases.
• Phase-specific rules belong in specs.
• README.md, CLAUDE.md, and spec history are mandatory.

Environment:
• WSL 2 (Ubuntu) required.
• UV for Python environment management.

Phase 1 Rule:
• In-memory CLI Todo only.
• Features: Add, View, Update, Delete, Complete/Incomplete.
• No databases or external services.

This Constitution is the supreme authority.
Generate a concise, professional Constitution.md.

## Response snapshot

The project constitution has been updated to version `0.1.0` (initial creation).

Please review the following files for potential manual follow-up to ensure consistency with the new constitution:
*   `.specify/templates/plan-template.md`
*   `.specify/templates/spec-template.md`
*   `.specify/templates/tasks-template.md`
*   All command files in `.specify/commands/` (to check for references to "CLAUDE" and update to "Claude Code" or generic terms where appropriate).

Suggested commit message:
```
docs: feat(constitution): Initial project constitution v0.1.0
```

## Outcome

- ✅ Impact: Constitution created and updated.
- 🧪 Tests: No tests were executed.
- 📁 Files: `.specify/memory/constitution.md` updated.
- 🔁 Next prompts: User to review constitution and related templates.
- 🧠 Reflection: Successfully parsed user input to create a new project constitution and updated the constitution template accordingly. Identified dependent templates for manual review.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): None
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None