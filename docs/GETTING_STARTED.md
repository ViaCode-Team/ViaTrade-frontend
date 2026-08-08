[Русский](GETTING_STARTED_RU.md)

[Back to Documentation](README.md) · [Architecture →](ARCHITECTURE.md)

# Getting Started

## Prerequisites

- Node.js and npm. The repository does not currently declare an `engines` field.
- A backend reachable through the configured `/api` proxy for authenticated and data-backed workflows.

## Install and Run

```bash
npm install
npm run dev
```

Vite starts the development server. The frontend proxies `/api` requests to `https://localhost:7249` in the current development configuration.

## Validate the Setup

Run the project-wide check after changing source code or documentation:

```bash
npm run check:fix
```

The command runs ESLint fixes, TypeScript checking, Steiger FSD validation, and Prettier formatting. A successful Steiger run reports `No problems found!`.

The pre-commit hook runs `lint-staged`. On Windows, it splits staged files into commands of at most 7000 characters so commits with many files do not exceed the shell command-length limit.

## Command Reference

Every script currently declared in `package.json` is listed below.

| Command              | Use it when                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `npm run prepare`    | Reinstalling Husky hooks manually; npm also runs it after install. |
| `npm run dev`        | Developing the frontend locally.                                   |
| `npm run build`      | Type-checking and creating a production build.                     |
| `npm run preview`    | Serving the production build locally.                              |
| `npm run api:gen`    | `swagger.yaml` or API-generation configuration changed.            |
| `npm run types`      | Checking application TypeScript without a production build.        |
| `npm run lint`       | Checking ESLint rules without making changes.                      |
| `npm run lint:fix`   | Applying ESLint fixes, then reviewing the resulting changes.       |
| `npm run arch`       | Checking Feature-Sliced Design boundaries with Steiger.            |
| `npm run arch:fix`   | Applying Steiger's safe architecture fixes.                        |
| `npm run format`     | Checking formatting with Prettier.                                 |
| `npm run format:fix` | Applying Prettier formatting.                                      |
| `npm run check`      | Running linting, type checking, architecture, and format checks.   |
| `npm run check:fix`  | Applying lint/architecture/format fixes and checking TypeScript.   |

## Next Steps

- Read [Configuration](CONFIGURATION.md) before changing API URLs or build settings.
- Read [API Integration](API.md) before regenerating clients.

## See Also

- [Architecture](ARCHITECTURE.md) — source layers and import rules.
- [Configuration](CONFIGURATION.md) — environment and tool configuration.
- [Contributing](CONTRIBUTING.md) — required workflow for changes.
