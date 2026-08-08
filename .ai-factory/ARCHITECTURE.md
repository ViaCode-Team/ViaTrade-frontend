# Architecture: Feature-Sliced Design 2.1

## Overview

ViaTrade Frontend is a single-page React application organized with Feature-Sliced Design (FSD) 2.1. Its existing structure separates application initialization, route composition, reusable user flows, domain slices, and infrastructure while preserving the `widgets` layer already used by the application.

The architecture is intentionally pragmatic: page-specific code stays with its page, while a feature or entity is extracted only after its reuse and boundary are established. Steiger validates FSD boundaries, with generated API code and shared assets excluded by configuration.

## Decision Rationale

- **Project type:** Investment-analysis and trading-workflow frontend with multiple business domains.
- **Tech stack:** TypeScript, React, Vite, React Router, Mantine, TanStack Query, and Orval.
- **Key factor:** The codebase already follows FSD 2.1 and enforces it through `@feature-sliced/steiger`.

## Folder Structure

```text
src/
├── app/        # Application bootstrap, providers, router, layouts, security, global styles
├── pages/      # Route-level composition and page-local UI, state, and loading boundaries
├── widgets/    # Existing reusable screen blocks such as sidebars and overview tables
├── features/   # Reusable user scenarios and mutations
├── entities/   # Stable, reusable business-domain models and UI
└── shared/     # Query/API infrastructure, generic UI, utilities, configuration, and assets
    └── api/
        ├── client/  # Ky client and error normalization
        └── types/gen/ # Orval-generated API contracts and hooks
```

`src/app/entry.tsx` starts the application. `src/app/router/router.tsx` defines route composition and lazy page imports. Vite and TypeScript both resolve `@/*` to `src/*`.

## Dependency Rules

Dependencies flow only downward:

```text
app → pages → widgets → features → entities → shared
```

- ✅ A page may compose features, entities, shared UI, and established widgets.
- ✅ A feature may consume entity and shared public APIs.
- ✅ Shared modules may use other shared modules, but contain no business logic.
- ❌ A lower layer must not import from a higher layer.
- ❌ Slices on the same FSD layer must not import each other's internals or create circular dependencies.
- ❌ External code must not import a sliced layer's `ui`, `model`, or `api` internals directly; use its slice-level `index.ts`.

## Layer Communication

- Route-level components in `pages` compose lower-layer public APIs; layouts and router-wide concerns remain in `app`.
- API calls use Orval-generated hooks and types from shared API modules. Do not duplicate generated contracts manually.
- Use generated suspense hooks where possible. A data-owning container controls fetching, mutations, and URL state; reusable display components receive data and callbacks through props.
- Use `withQueryBoundary` for suspense-aware regions. Expected validation and mutation errors remain local to the current UI.

## Code Organization Note

- **New features:** Follow FSD boundaries and favor keeping one-page code local until reuse is real.
- **Existing widgets:** Keep established widgets intact. Do not introduce a widget for a single page; place that composition in the page instead.
- **Existing code:** Do not refactor unrelated code solely to match this document. Align touched code incrementally.

## Key Principles

1. **Pages first:** A page may own substantial UI, state, validation, and API integration.
2. **Public APIs:** Every consumer outside a sliced module imports from its `index.ts` public API.
3. **Meaningful extraction:** Create `features` and `entities` only for stable, confirmed reuse; keep infrastructure and CRUD wiring in `shared`.
4. **Clear async ownership:** The request-owning container controls server state, while reusable presentation remains query-free.
5. **FSD validation:** Keep the source compatible with the Steiger configuration and alias-based imports.

## Code Examples

### Compose lower-layer public APIs in a page

```tsx
import { LogoutCurrentSessionButton } from '@/features/auth/logout';
import { PageHeader } from '@/shared/ui/page-header';

export function ProfilePage() {
	return (
		<>
			<PageHeader
				title='Profile'
				rightSection={<LogoutCurrentSessionButton placement='inline' />}
			/>
		</>
	);
}
```

### Keep an asynchronous boundary near the data-owning component

```tsx
import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStrategiesOverview } from '../lib/use-strategies-overview';

function StrategiesOverviewList() {
	const { filteredStrategies } = useStrategiesOverview();

	return <StrategiesList strategies={filteredStrategies} />;
}

export const StrategiesOverviewListBoundary = withQueryBoundary(
	StrategiesOverviewList,
	{
		suspenseProps: { fallback: <StrategiesListSkeleton /> },
	},
);
```

## Anti-Patterns

- ❌ Importing another slice's internal files instead of its public API.
- ❌ Moving business rules or domain-specific workflows into `shared`.
- ❌ Creating an entity, feature, or widget only for anticipated reuse.
- ❌ Putting route composition or application-wide providers into a lower FSD layer.
- ❌ Replacing an in-place region skeleton with a whole-page loader during a refetch.
