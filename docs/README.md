[Russian](./README_RU.md)

# ViaTrade Frontend

A modern web application for investment analysis.

> [!WARNING]
> **Work in Progress.** This project is currently under active development. Some features may be incomplete or subject to change.

## 🚀 Tech Stack

| Category             | Technology             |
| -------------------- | ---------------------- |
| **Framework**        | React 19.2+            |
| **Language**         | TypeScript 5.9+        |
| **Build Tool**       | Vite 7.3+              |
| **UI Library**       | Material-UI (MUI) 7.3+ |
| **Styling**          | Emotion                |
| **State Management** | TanStack Query 5.90+   |
| **Routing**          | React Router 7.1+      |
| **Validation**       | Valibot                |
| **Icons**            | MUI Icons              |

## 📐 Architecture

The project follows [**Feature-Sliced Design (FSD)**](https://fsd.how/) architecture

## 📦 Getting Started

### Prerequisites

- Node.js (compatible with project's `package.json`)
- npm or compatible package manager

### Installation

```bash
npm install
```

### Development

```bash
npm run dev          # Start Vite development server
```

### Production Build

```bash
npm run build        # Type-check and build for production
npm run preview      # Preview production build locally
```

## 🛠 Code Quality

```bash
npm run lint         # Run ESLint with timing information
npm run lint:fix     # Run ESLint and auto-fix issues
npm run format       # Check formatting with Prettier
npm run format:fix   # Fix formatting with Prettier
npm run tsc          # Type-check the project
npm run check        # Run all checks: tsc + lint + format
npm run check:fix    # Run all checks with auto-fix: tsc + lint:fix + format:fix
```

## 🔧 API Generation

```bash
npm run api:gen      # Generate API types from OpenAPI spec using Orval
```

## 📜 Other Commands

```bash
npm run prepare      # Install Husky git hooks (runs automatically after install)
npm run types        # Type-check TypeScript files
```
