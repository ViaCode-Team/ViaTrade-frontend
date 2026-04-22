[Russian](./README_RU.md)

# ViaTrade frontend

Modern web application for investment analysis, trading signals, and related user workflows.

> [!WARNING]
> **Work in Progress.** This project is currently under active development. Some features may be incomplete or subject to change.

## Key Features

todo Key Features...

## Tech Stack

| Area             | Technologies                                  |
| ---------------- | --------------------------------------------- |
| Core             | React 19, TypeScript 5, Vite 7                |
| Routing and Data | React Router 7, TanStack Query 5              |
| UI and Styling   | Mantine 9, Tabler Icons, CSS Modules, PostCSS |
| Tooling and DX   | ESLint, Prettier, Husky                       |
| API and Mocking  | Orval, MSW                                    |

## Prerequisites

- Node.js compatible with `package.json`
- npm or compatible package manager

## Quick Start

Clone the repository and navigate to the project folder:

```bash
git clone <repository-url>
cd SkillSwap
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

## Commands

| Command              | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| `npm run dev`        | Start the Vite development server                           |
| `npm run build`      | Run TypeScript project build and create a production bundle |
| `npm run preview`    | Preview the production build locally                        |
| `npm run api:gen`    | Generate API client and types with Orval                    |
| `npm run types`      | Run TypeScript type-check for app sources                   |
| `npm run lint`       | Run ESLint                                                  |
| `npm run lint:fix`   | Run ESLint with autofix                                     |
| `npm run format`     | Check formatting with Prettier                              |
| `npm run format:fix` | Apply Prettier formatting                                   |
| `npm run check`      | Run `types`, `lint`, and `format`                           |
| `npm run check:fix`  | Run `types`, `lint:fix`, and `format:fix`                   |
| `npm run prepare`    | Install Husky hooks                                         |

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b <feature/amazing-feature>`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
4. Push to the branch (`git push origin <feature/amazing-feature>`)
5. Open a Pull Request
