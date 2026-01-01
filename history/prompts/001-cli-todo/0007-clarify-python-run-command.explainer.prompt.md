---
id: 0007
title: Clarify Python Run Command
stage: explainer
date: 2026-01-01
surface: agent
model: gemini-cli
feature: 001-cli-todo
branch: 001-cli-todo
user: rao
command: "just tell me i run this command for runnning my project src python3 -m cli.main"
labels: ["python", "run-command", "pythonpath"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - none
tests:
  - none
---

## Prompt

just tell me i run this command for runnning my project src python3 -m cli.main

## Response snapshot

You are very close! The correct command to run your project is:

```bash
PYTHONPATH=src python3 -m cli.main
```

You missed the `PYTHONPATH=` part at the beginning. This part is crucial as it tells Python to include your `src` directory when searching for modules.

Please use the full command as shown above.

## Outcome

- ✅ Impact: Clarified the correct command for running the Python project by emphasizing the missing `PYTHONPATH=` part.
- 🧪 Tests: None.
- 📁 Files: None.
- 🔁 Next prompts: Expecting the user to try the corrected command.
- 🧠 Reflection: The user was close but missed a critical part of the command. Re-emphasizing the exact syntax is important for clarity.

## Evaluation notes (flywheel)

- Failure modes observed: User omitted part of the command.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment: null
