[Russian](CONTRIBUTING_RU.md)

[← Security](SECURITY.md) · [Back to Documentation](README.md)

# Contributing

Code conventions for this repository.

When updating documentation, **DO NOT FORGET** to update all supported language versions consistently.

## Required Workflow After Changes

- Run `npm run check:fix` after code or documentation changes.
- If the command reports errors or warnings caused by the current change, fix them and run `npm run check:fix` again.
- Repeat until `npm run check:fix` exits successfully for the current change.
- Do not silently fix unrelated pre-existing issues outside the scope of the current change; report them separately with the failing command output.

## Architecture

The project is built using [**Feature-Sliced Design (FSD) 2.1**](https://fsd.how/) — a modern architectural methodology for scalable and maintainable frontend applications.

```text
src/
├── app/           # Application initialization
├── pages/         # Application pages
├── widgets/       # Complex UI blocks
├── features/      # User scenarios and business logic
├── entities/      # Business entities
└── shared/        # Reusable components and utilities
```

## Rules

- Do not move business logic into `shared` if it belongs in `entities`, `features`, or `pages`.
- Prefer alias imports through `@/`, except for imports within the current slice.
- Keep changes focused and minimal.

## Project-specific best practices

### UI composition and responsiveness

- Keep page-specific composition in the page's local `ui` directory. Create a `widget` only for an established reusable screen block.
- Keep wrapper components thin. Extract a reusable or logically distinct UI part into its own component, but use a hook instead of a component that only performs side effects and returns `null`.
- For button-triggered dialogs, use the `@mantine/modals` manager provided by `ModalsProvider`; do not add local modal state unless the interaction needs local control.
- Prefer CSS Container Queries for reusable component layouts. Reserve media queries and `useMediaQuery` for app-level viewport behavior, such as the global sidebar or system theme.
- Import a CSS Module as `cls`. Do not reset `ul` or `li` locally: global styles already do that.
- Prefer `condition && expression` to `condition ? expression : null` when it preserves strict TypeScript correctness.

### Server state and feedback

- Use the fully generated Orval hooks, including generated suspense hooks, instead of manually pairing `useQuery` or `useSuspenseQuery` with generated query options.
- Let a use-case container own generated hooks, mutations, URL state, and pagination. Reusable lists and tables receive data, callbacks, and one optional pagination object through props.
- The pagination object belongs inside the reusable list or table and must provide `page`, `totalPages`, and `onPageChange`.
- Keep search, filters, and sorting usable while a list is loading or refetching. Show a region skeleton or in-place refresh feedback instead of blocking the page.
- Disable only actions that are invalid, unavailable, or must not be repeated. Show mutation progress on the affected row, card, or action.

### Errors and maintenance

- Keep expected validation and business errors local to the current UI. Use `withQueryBoundary` for suspense-aware loading failures and unexpected rendering errors.
- Use `type` by default; use `interface` only for extension or declaration merging.
- Use `createStorageKey()` for persistent-storage keys and cookie names. Retain hard-coded legacy keys only while an explicit migration needs them.

## Public API

- For sliced layers (`pages`, `widgets`, `features`, `entities`), use `index.ts` as the public API only at the slice level.
- Do not create intermediate `index.ts` files inside nested slice folders if they only mechanically re-export a single file.
- For `app` and `shared`, where there are no slices, a public API is allowed at the segment level or for a meaningful public module.
- For generated APIs, separate `index.ts` files are allowed inside the generated structure if required by the generator, types, or API client.

## Data Loading and Skeletons

- Prefer fetching data in the component that uses it when practical, especially to avoid prop drilling.
- Place loading boundaries around meaningful UI regions that own their data, not around the whole page or isolated text fragments.
- Use React `Suspense` with that region's skeleton fallback when the data-loading API or lazy-loading API supports suspense.

## QueryBoundary, Suspense, and ErrorBoundary

For components that use `useSuspenseQuery` or another suspense-compatible data-loading mechanism, use the following pair:

- `Component` — a clean component with the query, without its own `QueryBoundary`, `Suspense`, or `ErrorBoundary`;
- `ComponentBoundary` — the ready-to-use version of the component created through `withQueryBoundary(Component, options)`.

Use `ComponentBoundary` in regular code.

Use `Component` directly only when an outer component combines several suspense components under one shared boundary area.

Minimal example:

```tsx
import { useGetTradeStatisticsSuspense } from '@/entities/trade';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { getStatisticsSummaryCardsData } from '../../model/statistics-summary';
import { StatisticsSummarySkeleton } from './statistics-summary.skeleton';

export function StatisticsSummary() {
	const { data: response } = useGetTradeStatisticsSuspense();
	const cards = getStatisticsSummaryCardsData(response.data);

	return (
		<SummaryList>
			{cards.map((card) => (
				<SummaryCard
					key={card.id}
					title={card.title}
					value={card.value}
					description={card.description}
					color={card.color}
				/>
			))}
		</SummaryList>
	);
}

export const StatisticsSummaryBoundary = withQueryBoundary(StatisticsSummary, {
	suspenseProps: {
		fallback: <StatisticsSummarySkeleton />,
	},
});
```

If a specific area needs a separate error UI, pass it through `errorFallbackProps`:

```tsx
import { ErrorFallback } from '@/shared/ui/errorFallback';

export const StatisticsSummaryBoundary = withQueryBoundary(StatisticsSummary, {
	suspenseProps: {
		fallback: <StatisticsSummarySkeleton />,
	},
	errorFallbackProps: {
		FallbackComponent: ErrorFallback,
	},
});
```

Advanced composition with a shared boundary area:

```tsx
<QueryBoundary
	suspenseProps={{
		fallback: <ProfileDashboardSkeleton />,
	}}
>
	<StatisticsSummary />
	<SignalsSummary />
	<RemindsSummary />
</QueryBoundary>
```

### Local Error Handling

`QueryBoundary` is intended for async/query content loading errors and unexpected render errors. Expected business errors should be displayed inside the current UI and should not reach `ErrorBoundary`.

Example of a local form error:

```tsx
export function LoginForm() {
	const loginMutation = useMutation({
		mutationFn: login,
	});

	const errorMessage = getLoginErrorMessage(loginMutation.error);

	return (
		<form>
			<TextInput name='email' />
			<PasswordInput name='password' />

			{errorMessage ? <Text role='alert'>{errorMessage}</Text> : null}

			<Button loading={loginMutation.isPending}>Log in</Button>
		</form>
	);
}
```

General rule:

- `useSuspenseQuery` + an error should replace the block → `QueryBoundary`.
- `useMutation` / validation / expected business error → local handling inside the component.

## Types

- Use `type` by default.
- Use `interface` only when contract extension or declaration merging is required. Disable the corresponding ESLint rule in that place.

## CSS Modules

- Create `.module.css` only when a component has its own local styles.
- Do not create `.module.css` for trivial cases with no significant structural value.
- Move styles into CSS Modules when it makes JSX cleaner and separates visual logic from markup.

## Storage Keys

- Use `createStorageKey()` from `src/shared/lib/storage-key.ts` for persistent storage keys.
- Use the same `createStorageKey()` helper for cookie names.
- Storage keys use the `viatrade_scope_name` format.
- Keep hardcoded legacy keys only when an explicit migration is required.

## Spacing

- Use Mantine spacing tokens (`xs`, `sm`, `md`, `lg`, `xl`) as the default spacing scale.
- Use shared layout constants from `src/shared/model/layout.ts` for app shell padding, page gaps, and grid spacing.
- Make page gutters, major section gaps, and content grid spacing responsive when they compete with content width.
- Keep small internal UI gaps stable unless a component has a proven mobile layout issue.
- Use raw numeric spacing only for micro gaps intentionally smaller than Mantine tokens or for layout gaps larger than the Mantine spacing scale.

## Naming

| **Entity**                         | **Rule**                   | **Example**                      |
| ---------------------------------- | -------------------------- | -------------------------------- |
| Folders/files                      | `kebab-case`               | `strategy-page`                  |
| CSS Modules                        | `kebab-case.module.css`    | `strategy-page.module.css`       |
| Skeleton files                     | `<component>.skeleton.tsx` | `strategy-hero.skeleton.tsx`     |
| React components                   | `PascalCase`               | `StrategyPage`                   |
| Boundary component                 | `<Component>Boundary`      | `TradesHistoryTableBoundary`     |
| Error fallback component           | `<Component>ErrorFallback` | `StatisticsSummaryErrorFallback` |
| CSS/SCSS classes                   | `camelCase`                | `pageTitle`                      |
| Variables                          | `camelCase`                | `strategyName`                   |
| Functions                          | `camelCase`                | `getAccuracyColor`               |
| Constants                          | `SCREAMING_SNAKE_CASE`     | `ROUTES`                         |
| HOC                                | `with` + `camelCase`       | `withQueryBoundary`              |
| Hooks                              | `use` + `camelCase`        | `useLoginForm`                   |
| List pages                         | plural                     | `strategies-page`                |
| Detail pages                       | singular                   | `strategy-page`                  |
| URL Search Parameters (Search)     | `q`                        | `?q=search`                      |
| URL Search Parameters (Filters)    | `*Filter`                  | `?typeFilter=long`               |
| URL Search Parameters (Sorting)    | `*Sort`                    | `?fieldSort=date`                |
| URL Search Parameters (Pagination) | `page`                     | `?page=1`                        |

## See Also

- [Getting Started](GETTING_STARTED.md) — local development commands.
- [Architecture](ARCHITECTURE.md) — FSD layer and import boundaries.
- [API Integration](API.md) — generated-client workflow.
