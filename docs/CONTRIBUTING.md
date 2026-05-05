[Russian](./CONTRIBUTING_RU.md)

# Contributing

Code conventions for this repository.

When updating documentation, **DO NOT FORGET** to update all supported language versions consistently.

## Required Workflow After Changes

- Run `npm run check:fix` after code or documentation changes.
- If it reports errors or warnings caused by the current change, fix them and run `npm run check:fix` again.
- Repeat until `npm run check:fix` exits successfully for the current change.
- Do not silently fix unrelated pre-existing issues outside the current change scope; report them separately with the failing command output.

## Architecture

The project is built using [**Feature-Sliced Design (FSD) 2.1**](https://fsd.how/) — a modern architectural methodology for scalable and maintainable frontend applications.

```
src/
├── app/           # Application initialization
├── pages/         # Page-level components
├── widgets/       # Complex UI blocks
├── features/      # User interactions & business logic
├── entities/      # Business entities
└── shared/        # Reusable components & utilities
```

## Rules

- Keep business logic out of `shared` if it belongs to `entities`, `features`, or `pages`
- Use `index.ts` as a slice public API
- Prefer alias imports through `@/`, except for imports within the current slice
- Keep changes focused and minimal

## Data Loading and Skeletons

- Prefer fetching data in the component that uses it when practical, especially to avoid prop drilling
- Place loading boundaries around meaningful UI regions that own their data, not around the whole page or isolated text fragments
- Use React `Suspense` with that region's skeleton fallback when the data or lazy-loading API supports suspense

## Types

- Use `type` by default
- Use `interface` only when contract extension or declaration merging is required

## CSS Modules

- Use `camelCase` for CSS Module class names
- Create `.module.css` only when a component has its own local styles
- Do not create `.module.css` for trivial styling with no real structural value
- Move styles into CSS Modules when they make JSX cleaner and separate visual logic from markup

## Spacing

- Use Mantine spacing tokens (`xs`, `sm`, `md`, `lg`, `xl`) as the default spacing scale
- Use shared layout constants from `src/shared/model/layout.ts` for app shell padding, page gaps, and grid spacing
- Make page gutters, major section gaps, and content grid spacing responsive when they compete with content width
- Keep small internal UI gaps stable unless a component has a proven mobile layout issue
- Use raw numeric spacing only for micro gaps intentionally smaller than Mantine tokens or layout gaps larger than the Mantine spacing scale

## Naming

| **Entity**       | **Rule**                                         | **Example**                  |
| ---------------- | ------------------------------------------------ | ---------------------------- |
| Folders/Files    | `kebab-case`                                     | `strategy-page`              |
| CSS Modules      | `kebab-case.module.css`                          | `strategy-page.module.css`   |
| Skeleton files   | `<component>.skeleton.tsx` next to the component | `strategy-hero.skeleton.tsx` |
| React Components | `PascalCase`                                     | `StrategyPage`               |
| SCSS/CSS Classes | `camelCase`                                      | `pageTitle`                  |
| Variables        | `camelCase`                                      | `strategyName`               |
| Functions        | `camelCase`                                      | `getAccuracyColor`           |
| Constants        | `SCREAMING_SNAKE_CASE`                           | `ROUTES`                     |
| Hooks            | `use` + `camelCase`                              | `useLoginForm`               |
| List pages       | plural                                           | `strategies-page`            |
| Detail pages     | singular                                         | `strategy-page`              |
