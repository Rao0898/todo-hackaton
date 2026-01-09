<!-- Sync Impact Report:
Version change: 0.1.0 -> 1.0.0
List of modified principles:
  - V. Architecture of Intelligence (new)
  - VI. Statelessness (new)
Added sections:
  - Phase 2: FastAPI, Next.js, Neon DB, Better Auth
  - Phase 3: AI Chatbot, OpenAI Agents SDK, MCP Server - Stateless
  - Phase 4: Docker, Minikube, Helm
  - Phase 5: Kafka, Dapr, Microservices
Removed sections:
  - None
Templates requiring updates:
  - None
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

### V. Architecture of Intelligence
Design for modular, stateless, and observable AI components. This enables scalable, maintainable, and debuggable intelligent systems.

### VI. Statelessness
All services and components should be stateless wherever possible. This simplifies scaling, improves resilience, and enhances predictability.

## Code Standards

*   Clean, modular code following language-specific best practices.
*   Clear naming, Single Responsibility Principle (SRP), validation, and error handling.
*   Deterministic, user-friendly API and CLI behavior.

These standards ensure high code quality, maintainability, and a consistent user experience.

## Project Structure

*   One Constitution.md for all phases.
*   Phase-specific rules belong in specs.
*   README.md, GEMINI.md, and spec history are mandatory.

This structure provides a clear organizational framework for the project documentation and development artifacts.

## Development Environment

*   WSL 2 (Ubuntu) required.
*   UV for Python environment management.
*   Docker and Minikube for containerization and orchestration.

These environment requirements standardize the development setup, minimizing "it works on my machine" issues.

## Phase 1: In-memory CLI Todo

*   In-memory CLI Todo only.
*   Features: Add, View, Update, Delete, Complete/Incomplete.
*   No databases or external services.

This defines the initial scope and constraints for the first phase of the project, focusing on core CLI functionality without external dependencies.

## Phase 2: FastAPI, Next.js, Neon DB, Better Auth

*   **Backend**: FastAPI with Postgres (Neon DB).
*   **Frontend**: Next.js with TypeScript.
*   **Authentication**: Implement a robust authentication mechanism.

This phase evolves the application into a full-stack web service with a persistent data store and secure user access.

## Phase 3: AI Chatbot, OpenAI Agents SDK, MCP Server - Stateless

*   **AI Chatbot**: Integrate an AI-powered chatbot for task management.
*   **AI Agents**: Utilize the OpenAI Agents SDK for advanced agentic workflows.
*   **MCP Server**: Implement a stateless Mission Control Plane (MCP) server for managing AI agents and tasks.

This phase introduces artificial intelligence to enhance user interaction and automate complex tasks.

## Phase 4: Docker, Minikube, Helm

*   **Containerization**: Dockerize all services.
*   **Orchestration**: Use Minikube for local Kubernetes development.
*   **Deployment**: Manage deployments with Helm charts.

This phase focuses on operational readiness, ensuring the application is scalable, portable, and easy to manage in a cloud-native environment.

## Phase 5: Kafka, Dapr, Microservices

*   **Event-Driven Architecture**: Use Kafka for asynchronous communication.
*   **Microservices**: Decompose the application into a distributed system of microservices using the Dapr framework.

This phase re-architects the application for maximum scalability, resilience, and flexibility by adopting a microservices-based, event-driven approach.

## Governance

Constitution is the supreme authority; Amendments require documentation, approval, migration plan; All PRs/reviews must verify compliance; Complexity must be justified.

**Version**: 1.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2026-01-03