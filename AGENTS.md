# AGENTS

Use this file for repository-specific agent behavior and workflow rules; keep code conventions in project documentation.

## Rules

### Source of truth

- Follow [Contributing Rules](./docs/CONTRIBUTING.md) unless the user explicitly asks for a different approach.
- Use [Documentation Index](./docs/README.md) as the entry point for project docs, including stack and tooling reference.

### Code

- Write clear, maintainable, quality code.
- Preserve the user's established code style in touched files and nearby code unless project rules or explicit user instructions require otherwise.
- If the user modifies a file or rolls back changes without explicitly requesting further modifications to those parts, work with the file as it is. If you believe further changes are necessary, you must ask for permission first.
- Follow established programming and library best practices; consult relevant docs, MCP tools, or skills before using unfamiliar APIs.
- Prefer safe changes. Avoid risky shortcuts, unintended behavior changes, and security, stability, or data-loss issues.
- Keep wrapper components thin; move reusable or logically distinct UI parts into dedicated components.
- Do not define multiple full components in a single file; split them into separate files (e.g., if extracting a list from a section, move it to its own file).
- For button-triggered modals, use `ModalsProvider` and the `@mantine/modals` manager instead of local modal state unless local control is explicitly required.
- Do not write local CSS to reset `ul` or `li` elements (e.g., `list-style: none`, `padding: 0`, `margin: 0`). This is already handled globally in `src/app/styles/global.css`.
- Avoid using manual `useSuspenseQuery` or `useQuery` hooks with generated query options. Always prefer the fully generated API hooks (e.g., `useGetAllByUserSuspense()`) wherever possible without breaking functionality.
- Do not move components into separate widgets if they are used and intended for a single page; this clutters the code. Instead, place them in the page's local `ui` folder.
- Prefer hooks for side-effect-only logic. Do not create components that only return `null`; use a hook or a provider that renders children.
- Keep data fetching in use-case-specific container components. Reusable display components must remain query-free and receive only the data, pagination state, and callbacks they need through props.
- Pagination is display UI: render it inside the reusable list/table component. Its container owns the request and URL/state synchronization, then passes one optional `pagination` object whose `page`, `totalPages`, and `onPageChange` fields are required.
- Prefer `condition && expression` over `condition ? expression : null` for more concise code, provided it doesn't break strict TypeScript types (e.g., valid in React renders and Mantine form validations).

### Loading and controls

- Keep search, filters, and sorting interactive while a list is loading or refetching; show pending feedback without disabling these controls.
- Use `disabled` only for unavailable, invalid, or non-repeatable mutation actions; place its loader on the affected row/card/action, not unrelated filters or lists.
- For list requests, use a skeleton or in-place refresh indicator, never a whole-page loader for one pending region.

### Tooling

- Use Mantine MCP for Mantine components, props, hooks, and docs; use Context7 for other libraries and framework docs.
- **CRITICAL/MANDATORY**: At the VERY END of the task, after making ANY code or documentation changes, you MUST ALWAYS run the verification command using `cmd.exe /c "npm run check:fix"` on Windows instead of just `npm run check:fix`. Do not skip this step!
- Do not run additional `npm` commands unless the user explicitly asks for them.

### Responsive Design

- Prefer CSS Container Queries (`@container`) over Media Queries (`@media` or `useMediaQuery`) for component-level responsiveness. Use them when:
  - Changing layout based on available width (e.g., changing grid columns, flexing directions).
  - The component is meant to be reusable across different containers (e.g., full-page vs sidebar).
  - Avoiding hydration mismatches (SSR issues with `useMediaQuery`).
- Use Media Queries only for global app-level layouts (e.g., hiding a global sidebar on mobile).

### Naming Conventions

- Never name components with a `Content` suffix. Use the base name for the component, and append the `Boundary` suffix when wrapping it with `withQueryBoundary` (e.g., `Component` and `ComponentBoundary`).
- Always import CSS modules as `cls` (e.g., `import cls from './style.module.css'`), never as `classes` and etc.
- URL Search Parameters must follow these naming rules:
  - Search queries: `q`
  - Filters: must have `Filter` suffix (e.g. `typeFilter`, `statusFilter`)
  - Sorting: must have `Sort` suffix (e.g. `fieldSort`, `directionSort`)
  - Pagination: `page`

### Truth and verification

- Tell the truth; do not invent facts, files, requirements, behavior, results, or verification outcomes.
- Do not guess when the repository or available tools can verify the answer.
- State uncertainty explicitly when something is unknown, ambiguous, or unverified.
- Verify before claiming that something is fixed, complete, passing, or implemented.
- If verification cannot be completed, explain why instead of assuming success.

### Documentation maintenance

- If a task changes rules, conventions, workflow, architecture expectations, or naming rules, propose updating the relevant documentation.
- If a task changes how the agent should work in this repository, propose updating `AGENTS.md`.
- If the user repeats the same instruction, preference, or agreement multiple times, propose documenting it.
- Do not leave documentation outdated after rule changes.

## Priority

1. Explicit user instructions
2. `docs/CONTRIBUTING.md`
3. Other project documentation
4. Existing project patterns

## File constraints `AGENTS.md`

- Must be written in English.
- Must stay concise.
- Must never exceed 100 lines.
