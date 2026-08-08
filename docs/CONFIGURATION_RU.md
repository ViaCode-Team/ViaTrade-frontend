[English](CONFIGURATION.md)

[← Архитектура](ARCHITECTURE_RU.md) · [К документации](README_RU.md) · [Интеграция с API →](API_RU.md)

# Конфигурация

## Переменные окружения

Скопируйте `.env.example` в локальный файл `.env` и скорректируйте значения под окружение. `.env` исключен из Git.

| Переменная               | Используется в     | Пример значения         | Назначение                                                      |
| ------------------------ | ------------------ | ----------------------- | --------------------------------------------------------------- |
| `VITE_API_BASE_URL_DEV`  | Development builds | `http://localhost:5173` | Префикс API-запросов, когда Vite работает в development-режиме. |
| `VITE_API_BASE_URL_PROD` | Production builds  | `http://localhost:4173` | Префикс API-запросов в production-сборке.                       |

`src/shared/config/app.ts` выбирает development- или production-значение через `import.meta.env.DEV`. Ky-клиент использует выбранное значение как префикс запросов.

## Vite и PWA

- `vite.config.ts` настраивает React, React Compiler preset, PWA, alias `@`, API-прокси и bundle analysis только для production.
- `config/vite/proxy.ts` проксирует `/api` на `https://localhost:7249` и отключает проверку сертификата для локальной разработки.
- `config/vite/pwa.ts` регистрирует автоматически обновляемое PWA и кеширует шрифты до одного года. Пользовательские API-ответы в этом кеше хранить нельзя.

## Конфигурация инструментов

| Файл                 | Назначение                                            |
| -------------------- | ----------------------------------------------------- |
| `tsconfig.app.json`  | Строгие настройки TypeScript и alias `@/*`.           |
| `eslint.config.mjs`  | Конфигурация ESLint.                                  |
| `steiger.config.ts`  | Валидация FSD и исключения для generated code/assets. |
| `orval.config.ts`    | Генерация API-клиентов для OpenAPI tags.              |
| `postcss.config.cjs` | Обработка стилей приложения через PostCSS.            |

## См. также

- [Начало работы](GETTING_STARTED_RU.md) — настройка локальной копии.
- [Интеграция с API](API_RU.md) — API base URL и сгенерированные клиенты.
- [Безопасность](SECURITY_RU.md) — границы browser storage.
