# ViaTrade Frontend

## Overview

ViaTrade Frontend is a progressive web application for investment analysis, trading signals, strategy management, financial instruments, trades, notes, reminders, and portfolio statistics.

## Core Features

- Authentication, profile management, active-session control, and local PIN protection.
- Trading strategy, instrument, trade, signal, note, and reminder workflows.
- Responsive dashboard and statistics with automatic light and dark themes.
- Generated, type-safe API clients and React Query hooks from the OpenAPI specification.

## Tech Stack

- **Language:** TypeScript with strict compiler options.
- **Framework:** React 19 with Vite 8 and React Router.
- **Server state:** TanStack Query 5 with generated Orval hooks.
- **UI:** Mantine 9, Tabler Icons, CSS Modules, and PostCSS.
- **API:** Orval from `swagger.yaml`, with Ky as the HTTP client.
- **Architecture validation:** Feature-Sliced Design 2.1 enforced by Steiger.

## Architecture

Detailed architecture guidelines are maintained in [ARCHITECTURE.md](./ARCHITECTURE.md).

**Pattern:** Feature-Sliced Design 2.1.

## Non-Functional Requirements

- Keep API contracts generated from the OpenAPI specification rather than hand-maintained.
- Preserve strict TypeScript, ESLint, Prettier, and Steiger checks.
- Use local boundaries and skeletons for asynchronous UI regions; do not block unrelated controls during refetching.
- Keep persisted client data behind the established secure-storage and PIN-lock mechanisms.
