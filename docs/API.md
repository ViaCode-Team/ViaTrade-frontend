[Русский](API_RU.md)

[← Configuration](CONFIGURATION.md) · [Back to Documentation](README.md) · [Security →](SECURITY.md)

# API Integration

## Source of Truth

`swagger.yaml` is the OpenAPI source of truth. Do not hand-edit generated clients or contracts; update the specification and regenerate them instead.

```bash
npm run api:gen
```

The command runs Orval and then rebuilds the shared generated-type index. Orval output is split by resource tag.

## Generated Resources

| OpenAPI tag | Generated target                   |
| ----------- | ---------------------------------- |
| Instruments | `src/entities/instrument/api/gen/` |
| Notes       | `src/entities/note/api/gen/`       |
| Reminders   | `src/entities/reminder/api/gen/`   |
| Sessions    | `src/entities/session/api/gen/`    |
| Signals     | `src/entities/signal/api/gen/`     |
| Strategies  | `src/entities/strategy/api/gen/`   |
| Trades      | `src/entities/trade/api/gen/`      |
| Users       | `src/entities/user/api/gen/`       |

Shared schemas are exported from `src/shared/api/types/gen/`.

## Client Behavior

- Generated hooks use TanStack Query with suspense, prefetch, invalidation, and abort-signal support.
- `src/shared/api/client/custom-instance-fetch.ts` wraps Ky, returns the parsed response with headers and status, and normalizes failures.
- The Ky client retries once, marks the application online after a successful request, and updates offline state for network failures.
- Requests are blocked while the local security runtime locks sensitive application data.

## Query Cache Invalidation

- Configure mutation invalidation in `orval.invalidation.ts`; it is regenerated with the API client.
- Pass path parameters through `params`, for example `{ query: 'getTradeById', params: ['tradeId'] }`, so Orval generates an exact query-key invalidation.
- In handwritten code, use generated `invalidateGet...` helpers instead of URL literals or query-key predicates.
- When a mutation knows an `instrumentId`, invalidate its specific list with `invalidateGetStrategiesByInstrument(queryClient, instrumentId)`.
- Broad cache refreshes and intentional cache patches are exceptions; keep them scoped and document why the generated helper cannot express them.

## Working with an Endpoint

1. Change the relevant path, schema, or operation in `swagger.yaml`.
2. Run `npm run api:gen`.
3. Consume the generated hook through the owning entity's public API.
4. Run `npm run check:fix` before committing the change.

## See Also

- [Configuration](CONFIGURATION.md) — URL selection and local proxy configuration.
- [Architecture](ARCHITECTURE.md) — query ownership and FSD boundaries.
- [Security](SECURITY.md) — request gating while locally locked.
