[English](./CONTRIBUTING.md)

# Contributing

Соглашения по коду для этого репозитория.

При изменении документации **НЕ ЗАБЫВАТЬ** согласованно обновлять все поддерживаемые языковые версии.

## Обязательный workflow после изменений

- Запустить `npm run check:fix` после изменений в коде или документации.
- Если команда сообщает об ошибках или предупреждениях, вызванных текущим изменением, исправить их и снова запустить `npm run check:fix`.
- Повторять до тех пор, пока `npm run check:fix` не завершится успешно для текущего изменения.
- Не исправлять молча несвязанные существующие проблемы вне области текущего изменения; сообщить о них отдельно с выводом упавшей команды.

## Архитектура

Проект построен на основе [**Feature-Sliced Design (FSD) 2.1**](https://fsd.how/) — современной методологии архитектуры для масштабируемых и поддерживаемых фронтенд-приложений.

```
src/
├── app/           # Инициализация приложения
├── pages/         # Страницы приложения
├── widgets/       # Сложные UI-блоки
├── features/      # Пользовательские сценарии и бизнес-логика
├── entities/      # Бизнес-сущности
└── shared/        # Переиспользуемые компоненты и утилиты
```

## Правила

- Не переносить бизнес-логику в `shared`, если ей место в `entities`, `features` или `pages`.
- Предпочитать alias-импорты через `@/`, кроме импортов внутри текущего слайса.
- Держать изменения точечными и минимальными.

## Публичный API

- Для слоёв со слайсами (`pages`, `widgets`, `features`, `entities`) использовать `index.ts` как public API только на уровне слайса.
- Не создавать промежуточные `index.ts` внутри вложенных папок слайса, если они только механически реэкспортят один файл.
- Для `app` и `shared`, где нет слайсов, public API допускается на уровне сегмента или осмысленного публичного модуля.
- Для generated API допускаются отдельные `index.ts` внутри сгенерированной структуры, если это нужно генератору, типам или API-клиенту.

## Загрузка данных и skeleton

- Предпочитать загрузку данных в компоненте, который их использует, когда это практично, особенно чтобы избегать prop drilling.
- Размещать loading-boundary вокруг осмысленной области интерфейса, которая владеет своими данными, а не вокруг всей страницы или отдельного текстового фрагмента.
- Использовать React `Suspense` с fallback в виде skeleton этой области, когда API загрузки данных или lazy-loading поддерживает suspense.

## QueryBoundary, Suspense и ErrorBoundary

Для компонентов, которые используют `useSuspenseQuery` или другой suspense-compatible механизм загрузки данных, используется пара:

- `Component` — чистый компонент с запросом, без собственных `QueryBoundary`, `Suspense` и `ErrorBoundary`;
- `ComponentBoundary` — готовая версия компонента, созданная через `withQueryBoundary(Component, options)`.

В обычном коде используется `ComponentBoundary`.

`Component` используется напрямую только тогда, когда внешний компонент объединяет несколько suspense-компонентов под одной общей boundary-зоной.

Минимальный пример:

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

Если для конкретной области нужен отдельный UI ошибки, передавать его через `errorBoundaryProps`:

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

Продвинутая композиция с общей boundary-зоной:

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

### Локальная обработка ошибок

`QueryBoundary` предназначен для ошибок загрузки async/query-контента и неожиданных ошибок рендера. Ожидаемые бизнес-ошибки должны отображаться внутри текущего UI и не должны попадать в `ErrorBoundary`.

Пример локальной ошибки формы:

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

			<Button loading={loginMutation.isPending}>Войти</Button>
		</form>
	);
}
```

Общее правило:

- useSuspenseQuery + ошибка должна заменить блок → QueryBoundary.
- useMutation / validation / ожидаемая бизнес-ошибка → локальная обработка внутри компонента.

## Типы

- По умолчанию использовать `type`.
- `interface` использовать только там, где нужно расширение контракта или declaration merging. Отключать в этом месте соответствующее правило в Eslint.

## CSS Modules

- Создавать `.module.css` только тогда, когда у компонента есть собственные локальные стили.
- Не плодить `.module.css` для тривиальных случаев без заметной структурной пользы.
- Выносить стили в CSS Modules, если это делает JSX чище и отделяет визуальную логику от разметки.

## Ключи хранилищ

- Для ключей persistent storage использовать `createStorageKey()` из `src/shared/lib/storage-key.ts`.
- Для имён cookie использовать тот же `createStorageKey()`.
- Ключи хранилищ используют формат `viatrade_scope_name`.
- Хардкод старых ключей оставлять только когда явно нужна миграция.

## Отступы

- По умолчанию использовать Mantine spacing-токены (`xs`, `sm`, `md`, `lg`, `xl`).
- Для отступов app shell, page gap и grid spacing использовать общие константы из `src/shared/model/layout.ts`.
- Делать адаптивными page gutters, отступы между крупными секциями и content grid spacing, если они конкурируют с шириной контента.
- Маленькие внутренние UI-gap оставлять стабильными, если у компонента нет подтверждённой проблемы на mobile.
- Числовые значения использовать только для micro-gap, которые намеренно меньше Mantine-токенов, или для layout-gap больше шкалы Mantine spacing.

## Именование

| **Сущность**               | **Правило**                | **Пример**                   |
| -------------------------- | -------------------------- | ---------------------------- |
| Папки/файлы                | `kebab-case`               | `strategy-page`              |
| CSS Modules                | `kebab-case.module.css`    | `strategy-page.module.css`   |
| Skeleton-файлы             | `<component>.skeleton.tsx` | `strategy-hero.skeleton.tsx` |
| React-компоненты           | `PascalCase`               | `StrategyPage`               |
| Boundary-компонент         | `<Component>Boundary`      | `UserOrdersBoundary`         |
| Error fallback компонент   | `<Component>ErrorFallback` | `UserOrdersErrorFallback`    |
| CSS/SCSS-классы            | `camelCase`                | `pageTitle`                  |
| Переменные                 | `camelCase`                | `strategyName`               |
| Функции                    | `camelCase`                | `getAccuracyColor`           |
| Константы                  | `SCREAMING_SNAKE_CASE`     | `ROUTES`                     |
| HOC                        | `with` + `camelCase`       | `withQueryBoundary`          |
| Хуки                       | `use` + `camelCase`        | `useLoginForm`               |
| List pages                 | множественное число        | `strategies-page`            |
| Detail pages               | единственное число         | `strategy-page`              |
| URL-параметры (Поиск)      | `q`                        | `?q=search`                  |
| URL-параметры (Фильтры)    | Суффикс `Filter`           | `?typeFilter=long`           |
| URL-параметры (Сортировка) | Суффикс `Sort`             | `?fieldSort=date`            |
| URL-параметры (Пагинация)  | `page`                     | `?page=1`                    |
