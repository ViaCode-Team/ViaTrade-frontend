[Русский](ARCHITECTURE_RU.md)

[← Getting Started](GETTING_STARTED.md) · [Back to Documentation](README.md) · [Configuration →](CONFIGURATION.md)

# Architecture

## Overview

The frontend uses Feature-Sliced Design (FSD) 2.1 and validates its boundaries with Steiger. FSD keeps application initialization, route composition, reusable user flows, business domains, and generic infrastructure in distinct layers.

```text
src/
├── app/        # Bootstrap, router, providers, layouts, security, global styles
├── pages/      # Route-level composition and page-local code
├── widgets/    # Existing reusable screen blocks
├── features/   # Reusable user interactions
├── entities/   # Reusable business-domain models and UI
└── shared/     # API client, generic UI, utilities, configuration, and assets
```

## Import Direction

Dependencies flow downward:

```text
app → pages → widgets → features → entities → shared
```

- Import cross-slice code through its slice-level `index.ts` public API.
- Use `@/` imports across slices and relative imports only inside the current slice.
- Keep business rules out of `shared`; it contains infrastructure only.
- Keep one-page UI and state in `pages` until reuse is established.

## Data Flow

1. `src/app/entry.tsx` mounts the React application.
2. `AppProviders` installs PWA, security, query, current-user, and theme providers.
3. React Router composes route-level pages and app layouts.
4. Data-owning containers call generated Orval hooks and pass data to query-free display components.
5. `withQueryBoundary` places suspense and error handling around meaningful asynchronous regions.

## API and State

- `swagger.yaml` is the source for generated contracts and React Query hooks.
- Orval writes generated resource clients under `src/entities/*/api/gen/` and shared types under `src/shared/api/types/gen/`.
- Ky performs HTTP requests; the custom client normalizes errors and updates TanStack Query's online state.
- Persisted sensitive client data is guarded by the local PIN and secure storage flow.

## See Also

- [Getting Started](GETTING_STARTED.md) — local development workflow.
- [API Integration](API.md) — generated-client maintenance.
- [Contributing](CONTRIBUTING.md) — detailed coding conventions.
