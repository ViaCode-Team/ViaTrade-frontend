[English](ARCHITECTURE.md)

[← Начало работы](GETTING_STARTED_RU.md) · [К документации](README_RU.md) · [Конфигурация →](CONFIGURATION_RU.md)

# Архитектура

## Обзор

Frontend использует Feature-Sliced Design (FSD) 2.1; границы слоев проверяет Steiger. FSD разделяет инициализацию приложения, композицию маршрутов, переиспользуемые пользовательские сценарии, бизнес-домены и общую инфраструктуру.

```text
src/
├── app/        # Bootstrap, router, providers, layouts, security, global styles
├── pages/      # Композиция маршрутов и локальный код страниц
├── widgets/    # Существующие переиспользуемые экранные блоки
├── features/   # Переиспользуемые действия пользователя
├── entities/   # Переиспользуемые бизнес-модели и UI
└── shared/     # API-клиент, общий UI, утилиты, конфигурация и assets
```

## Направление импортов

Зависимости направлены вниз:

```text
app → pages → widgets → features → entities → shared
```

- Импортируйте код другого slice только через его публичный API `index.ts`.
- Между slices используйте импорты `@/`, внутри текущего slice — относительные.
- Не размещайте бизнес-правила в `shared`: это слой инфраструктуры.
- Держите UI и состояние одной страницы в `pages`, пока переиспользование не стало подтвержденным.

## Поток данных

1. `src/app/entry.tsx` монтирует React-приложение.
2. `AppProviders` подключает PWA, security, query, current-user и theme providers.
3. React Router компонует страницы маршрутов и app layouts.
4. Контейнеры, владеющие данными, вызывают сгенерированные Orval hooks и передают данные в query-free компоненты отображения.
5. `withQueryBoundary` размещает Suspense и обработку ошибок вокруг значимых асинхронных областей.

## API и состояние

- `swagger.yaml` — источник сгенерированных контрактов и React Query hooks.
- Orval записывает клиенты ресурсов в `src/entities/*/api/gen/`, а общие типы — в `src/shared/api/types/gen/`.
- Ky выполняет HTTP-запросы; кастомный клиент нормализует ошибки и обновляет online state TanStack Query.
- Сохраненные чувствительные клиентские данные защищены локальным PIN и secure storage flow.

## См. также

- [Начало работы](GETTING_STARTED_RU.md) — локальный workflow разработки.
- [Интеграция с API](API_RU.md) — поддержка сгенерированного клиента.
- [Участие в разработке](CONTRIBUTING_RU.md) — подробные соглашения по коду.
