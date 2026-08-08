# Project Base Rules

> Auto-detected conventions from the current codebase. Update this file when conventions change.

## Naming Conventions

- Files and directories: `kebab-case`; CSS Modules: `kebab-case.module.css`.
- Components and types: `PascalCase`; component props use the `<Component>Props` pattern.
- Variables, functions, and hooks: `camelCase`; hooks start with `use`.
- Constants: `SCREAMING_SNAKE_CASE` for global constants and descriptive `camelCase` for local immutable values.
- Export `type` by default; use `interface` only for extension or declaration-merging needs.

## Module Structure

- The source follows Feature-Sliced Design: `app`, `pages`, `widgets`, `features`, `entities`, and `shared`.
- Use `@/` imports across slices and relative imports only inside the current slice.
- Sliced layers expose external APIs through their slice-level `index.ts`; do not bypass a slice's public API.
- Keep reusable display components query-free. Containers own generated API hooks, URL state, and mutations.

## Error Handling

- Wrap network and storage operations in `try`/`catch` where failures are expected.
- Normalize HTTP failures through the shared API client and present expected business errors locally.
- Use `QueryBoundary` and `withQueryBoundary` for suspense-compatible query failures and unexpected rendering failures.

## Control Flow

- Prefer flat, readable control flow over deeply nested conditionals. Use guard clauses, early `return`/`continue`, small named helper methods, or explicit classification logic when they make the code easier to follow. Handle edge cases and irrelevant branches early so the main path stays visible.

## Logging

- Logging is limited to `console.error` for storage or PIN-unlock failures.
- Do not add broad console logging; surface actionable failures through the established UI and error-boundary mechanisms.

## Testing

- No test-file convention is currently present in `src`.
- Run the repository check suite after code or documentation changes.
