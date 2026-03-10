[English](./README.md)

# ViaTrade Frontend

Современное веб-приложение для инвестиционного анализа.

> [!WARNING]
> **В разработке.** Проект находится в активной разработке. Некоторые функции могут быть неполными или подвержены изменениям.

## 🚀 Технологический стек

| Категория                 | Технология             |
| ------------------------- | ---------------------- |
| **Фреймворк**             | React 19.2+            |
| **Язык**                  | TypeScript 5.9+        |
| **Сборка**                | Vite 7.3+              |
| **UI библиотека**         | Material-UI (MUI) 7.3+ |
| **Стилизация**            | Emotion                |
| **Управление состоянием** | TanStack Query 5.90+   |
| **Роутинг**               | React Router 7.1+      |
| **Валидация**             | Valibot                |

## 📐 Архитектура

Проект следует архитектуре [**Feature-Sliced Design (FSD)**](https://feature-sliced.design/)

## 📦 Начало работы

### Требования

- Node.js (совместимый с `package.json` проекта)
- npm или другой пакетный менеджер

### Установка

```bash
npm install
```

### Разработка

```bash
npm run dev
```

### Продакшн сборка

```bash
npm run build
npm run preview
```

## 🛠 Качество кода

```bash
npm run lint         # Запуск ESLint
npm run lint:fix     # Авто-исправление ESLint
npm run format       # Проверка Prettier
npm run format:fix   # Исправление Prettier
npm run tsc          # Проверка типов
```
