[Русский](README_RU.md)

# ViaTrade Frontend

> A progressive web application for investment analysis, trading workflows, and protected local data.

ViaTrade brings strategies, market instruments, trades, signals, notes, reminders, and portfolio statistics into one React application. It combines a responsive Mantine interface with generated API clients, persistent server-state caching, and a local PIN lock for sensitive browser data.

> [!WARNING]
> **Work in Progress.** Features and workflows may change while the application is under active development.

## Quick Start

From an existing working copy, install dependencies and start the development server:

```bash
npm install
npm run dev
```

The application uses the `/api` development proxy configured in `config/vite/proxy.ts`; run the backend expected by your environment before using authenticated workflows.

## Highlights

- **Trading workflows** — explore strategies, instruments, trades, and generated signals.
- **Personal context** — store notes and reminder drafts alongside financial instruments and strategies.
- **Protected browser data** — encrypt persisted frontend data behind a local PIN unlock flow.
- **Responsive analysis UI** — dashboards, statistics, and light or dark color schemes.
- **Type-safe API access** — generate React Query hooks and TypeScript contracts from `swagger.yaml`.

## First Workflow

1. Start the frontend and the backend expected by your local environment.
2. Sign in, then complete local PIN setup when the application requests it.
3. Open a strategy or instrument to work with generated data, associated signals, notes, and reminders.

The PIN is a local browser protection layer; it does not replace backend authentication. See [Security](SECURITY.md) for its storage and lock behavior.

## Documentation

| Guide                                 | Description                                      |
| ------------------------------------- | ------------------------------------------------ |
| [Getting Started](GETTING_STARTED.md) | Install, run, and validate the application.      |
| [Architecture](ARCHITECTURE.md)       | FSD layers, imports, and data-flow boundaries.   |
| [Configuration](CONFIGURATION.md)     | Environment variables and project configuration. |
| [API Integration](API.md)             | Generated client workflow and backend resources. |
| [Security](SECURITY.md)               | PIN lock and encrypted browser storage.          |
| [Contributing](CONTRIBUTING.md)       | Workflow, conventions, and project practices.    |

## Common Commands

For the complete command reference, including checks and auto-fixes, see [Getting Started](GETTING_STARTED.md).

| Command             | Purpose                                                       |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Start the Vite development server.                            |
| `npm run build`     | Type-check and create a production build.                     |
| `npm run api:gen`   | Generate API clients and shared type exports.                 |
| `npm run check:fix` | Fix lint and formatting issues, type-check, and validate FSD. |

## License

See the [MIT License](../LICENSE).

## See Also

- [Getting Started](GETTING_STARTED.md) — detailed local setup.
- [API Integration](API.md) — generated API-client workflow.
- [Security](SECURITY.md) — local PIN and encrypted storage.
