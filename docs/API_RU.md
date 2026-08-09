[English](API.md)

[← Конфигурация](CONFIGURATION_RU.md) · [К документации](README_RU.md) · [Безопасность →](SECURITY_RU.md)

# Интеграция с API

## Источник истины

`swagger.yaml` — источник истины OpenAPI. Не редактируйте сгенерированные клиенты и контракты вручную: сначала измените спецификацию, затем перегенерируйте код.

```bash
npm run api:gen
```

Команда запускает Orval и затем пересобирает общий index сгенерированных типов. Вывод Orval разделен по тегам ресурсов.

## Сгенерированные ресурсы

| OpenAPI tag | Каталог генерации                  |
| ----------- | ---------------------------------- |
| Instruments | `src/entities/instrument/api/gen/` |
| Notes       | `src/entities/note/api/gen/`       |
| Reminders   | `src/entities/reminder/api/gen/`   |
| Sessions    | `src/entities/session/api/gen/`    |
| Signals     | `src/entities/signal/api/gen/`     |
| Strategies  | `src/entities/strategy/api/gen/`   |
| Trades      | `src/entities/trade/api/gen/`      |
| Users       | `src/entities/user/api/gen/`       |

Общие схемы экспортируются из `src/shared/api/types/gen/`.

## Поведение клиента

- Сгенерированные hooks используют TanStack Query с Suspense, prefetch, invalidation и поддержкой abort signal.
- `src/shared/api/client/custom-instance-fetch.ts` оборачивает Ky, возвращает разобранный ответ с headers и status и нормализует ошибки.
- Ky-клиент делает одну повторную попытку, отмечает приложение онлайн после успешного запроса и обновляет offline state при сетевых ошибках.
- Пока security runtime локально блокирует чувствительные данные, запросы запрещены.

## Инвалидация query-кэша

- Настраивать инвалидацию мутаций в `orval.invalidation.ts`: она будет пересоздана вместе с API-клиентом.
- Передавать path-параметры через `params`, например `{ query: 'getTradeById', params: ['tradeId'] }`, чтобы Orval сгенерировал точную инвалидацию query key.
- В рукописном коде использовать generated helpers `invalidateGet...`, а не URL-литералы и predicates для query key.
- Когда мутация знает `instrumentId`, инвалидировать только его список: `invalidateGetStrategiesByInstrument(queryClient, instrumentId)`.
- Широкое обновление кэша и намеренное точечное изменение кэша — исключения; их нужно ограничивать по области и объяснять, почему generated helper не подходит.

## Работа с endpoint

1. Измените нужный path, schema или operation в `swagger.yaml`.
2. Запустите `npm run api:gen`.
3. Используйте сгенерированный hook через публичный API владеющей entity.
4. Перед коммитом запустите `npm run check:fix`.

## См. также

- [Конфигурация](CONFIGURATION_RU.md) — выбор URL и локальный прокси.
- [Архитектура](ARCHITECTURE_RU.md) — владение query и границы FSD.
- [Безопасность](SECURITY_RU.md) — блокировка запросов при локальной защите.
