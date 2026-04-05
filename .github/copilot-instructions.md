# Project Guidelines

## Overview

ViaTrade Frontend — investment analysis web app. React 19 + TypeScript 5.9 + Vite 7 + Mantine 9.

> **The README lists MUI — this is outdated. The actual UI library is Mantine 9.** The `types/mui*.d.ts` files are empty stubs.

## Architecture

[Feature-Sliced Design (FSD)](https://fsd.how/). Layers (top → bottom, imports only go down):

```
app → pages → widgets → features → entities → shared
```

- **Path alias**: `@/*` → `src/*`
- **Naming**: kebab-case folders, barrel exports via `index.ts`
- **Pages** must export `Component` (named, not default) for lazy routing:
  ```tsx
  export { MyPage as Component };
  ```

## Code Style

- **Tabs**, single quotes, semicolons (enforced by ESLint)
- **`type`** keyword for props/types — never `interface` (ESLint rule)
- **CSS Modules** for styling (`.module.css` files)
- Object curly newlines: min 5 properties before breaking
- Import sorting by perfectionist plugin with blank lines between groups
- Generated code (`gen/**`) has relaxed ESLint rules — don't manually fix it

## Component Patterns

- Use **Mantine 9** components and hooks — never MUI
- Props: `type ComponentProps = { ... }`
- Custom hooks go in `lib/` subfolder
- Schemas and types go in `model/` subfolder

## Forms — Custom Pattern (NOT @mantine/form)

Despite `@mantine/form` being in dependencies, forms use a **custom useState-based pattern**:

1. `model/xxx-data.ts` — Valibot schema + inferred TS type
2. `model/xxx-validation.ts` — `validateXxxForm()` using `v.safeParse()`
3. `lib/use-xxx-form.ts` — useState-based form hook (manual fields, errors)
4. `model/xxx-error-map.ts` — maps API ProblemDetails errors to form fields
5. `ui/xxx-form.tsx` — form component

See `src/features/login/` for a reference implementation.

## API Layer

- **Orval** generates queries/mutations from `swagger.yml` into `api/gen/`
- Custom **fetch** client (not axios) — see `src/shared/api/client/`
- **TanStack Query v5** for server state
- Backend returns `application/problem+json` (ASP.NET ProblemDetails) for errors
- Token refresh interceptor with **deduplication** in `src/entities/auth/api/refresh-interceptor.ts`
- Regenerate API types: `npm run api:gen`

## Build & Commands

See [docs/README.md](../docs/README.md) for the full list. Key commands:

```bash
npm run dev          # Vite dev server
npm run build        # tsc -b + vite build
npm run check        # types + lint + format
npm run check:fix    # types + lint:fix + format:fix
npm run api:gen      # regenerate API from swagger.yml
```

Pre-commit hooks (husky + lint-staged): type-check `.ts/.tsx`, eslint `--fix`, prettier.

## Validation

Valibot with Russian i18n (`better-ru` lang). Global config set in `src/shared/model/validate.ts`.

## Routing

React Router v7 with lazy imports. Guard via `ProtectedRoute` using `useGetMe()`.
Layouts: `MainLayout` (nprogress) → `DashboardLayout` (header + sidebar) | `AuthLayout`.
