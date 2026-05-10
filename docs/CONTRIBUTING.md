[Russian](./CONTRIBUTING_RU.md)

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
export function UserOrders(props: UserOrdersProps) {
	const { data } = useSuspenseQuery(userOrdersQueryOptions(props.userId));

	return <OrdersList orders={data} />;
}

export const UserOrdersBoundary = withQueryBoundary(UserOrders, {
	suspenseProps: {
		fallback: <UserOrdersSkeleton />,
	},
});
```

If a specific area needs a separate error UI, pass it through `errorBoundaryProps`:

```tsx
export const UserOrdersBoundary = withQueryBoundary(UserOrders, {
	suspenseProps: {
		fallback: <UserOrdersSkeleton />,
	},
	errorBoundaryProps: {
		FallbackComponent: UserOrdersErrorFallback,
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
	<UserOrders userId={userId} />
	<UserPayments userId={userId} />
	<UserActivity userId={userId} />
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

## Spacing

- Use Mantine spacing tokens (`xs`, `sm`, `md`, `lg`, `xl`) as the default spacing scale.
- Use shared layout constants from `src/shared/model/layout.ts` for app shell padding, page gaps, and grid spacing.
- Make page gutters, major section gaps, and content grid spacing responsive when they compete with content width.
- Keep small internal UI gaps stable unless a component has a proven mobile layout issue.
- Use raw numeric spacing only for micro gaps intentionally smaller than Mantine tokens or for layout gaps larger than the Mantine spacing scale.

## Naming

| **Entity**               | **Rule**                   | **Example**                  |
| ------------------------ | -------------------------- | ---------------------------- |
| Folders/files            | `kebab-case`               | `strategy-page`              |
| CSS Modules              | `kebab-case.module.css`    | `strategy-page.module.css`   |
| Skeleton files           | `<component>.skeleton.tsx` | `strategy-hero.skeleton.tsx` |
| React components         | `PascalCase`               | `StrategyPage`               |
| Boundary component       | `<Component>Boundary`      | `UserOrdersBoundary`         |
| Error fallback component | `<Component>ErrorFallback` | `UserOrdersErrorFallback`    |
| CSS/SCSS classes         | `camelCase`                | `pageTitle`                  |
| Variables                | `camelCase`                | `strategyName`               |
| Functions                | `camelCase`                | `getAccuracyColor`           |
| Constants                | `SCREAMING_SNAKE_CASE`     | `ROUTES`                     |
| HOC                      | `with` + `camelCase`       | `withQueryBoundary`          |
| Hooks                    | `use` + `camelCase`        | `useLoginForm`               |
| List pages               | plural                     | `strategies-page`            |
| Detail pages             | singular                   | `strategy-page`              |
