[Русский](CONFIGURATION_RU.md)

[← Architecture](ARCHITECTURE.md) · [Back to Documentation](README.md) · [API Integration →](API.md)

# Configuration

## Environment Variables

Copy `.env.example` to a local `.env` file and adjust values for the environment. `.env` is ignored by Git.

| Variable                 | Used in            | Example value           | Purpose                                                     |
| ------------------------ | ------------------ | ----------------------- | ----------------------------------------------------------- |
| `VITE_API_BASE_URL_DEV`  | Development builds | `http://localhost:5173` | Prefix for API requests when Vite runs in development mode. |
| `VITE_API_BASE_URL_PROD` | Production builds  | `http://localhost:4173` | Prefix for API requests in production builds.               |

`src/shared/config/app.ts` selects the development or production value through `import.meta.env.DEV`. The Ky client uses the selected value as its request prefix.

## Vite and PWA

- `vite.config.ts` configures React, the React Compiler preset, PWA support, path alias `@`, API proxying, and production-only bundle analysis.
- `config/vite/proxy.ts` proxies `/api` to `https://localhost:7249` with certificate verification disabled for local development.
- `config/vite/pwa.ts` registers an auto-updating PWA and caches font assets for up to one year. It must not be used to cache user API responses.

## Tooling Configuration

| File                 | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| `tsconfig.app.json`  | Strict TypeScript settings and the `@/*` alias.          |
| `eslint.config.mjs`  | ESLint configuration.                                    |
| `steiger.config.ts`  | FSD validation and exclusions for generated code/assets. |
| `orval.config.ts`    | API-client generation per OpenAPI tag.                   |
| `postcss.config.cjs` | PostCSS processing for application styles.               |

## See Also

- [Getting Started](GETTING_STARTED.md) — setting up a local copy.
- [API Integration](API.md) — API base URLs and generated clients.
- [Security](SECURITY.md) — browser-storage boundaries.
