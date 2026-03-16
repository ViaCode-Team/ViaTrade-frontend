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
| **Иконки**                | MUI Icons              |

## 📐 Архитектура

Проект следует архитектуре [**Feature-Sliced Design (FSD)**](https://fsd.how/)

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
npm run dev          # Запуск сервера разработки Vite
```

### Продакшн сборка

```bash
npm run build        # Проверка типов и сборка для продакшена
npm run preview      # Локальный просмотр продакшн сборки
```

## 🛠 Качество кода

```bash
npm run lint         # Запуск ESLint с информацией о времени
npm run lint:fix     # Запуск ESLint с авто-исправлением
npm run format       # Проверка форматирования Prettier
npm run format:fix   # Исправление форматирования Prettier
npm run tsc          # Проверка типов TypeScript
npm run check        # Запуск всех проверок: tsc + lint + format
npm run check:fix    # Запуск всех проверок с авто-исправлением: tsc + lint:fix + format:fix
```

## 🔧 Генерация API

```bash
npm run api:gen      # Генерация типов API из OpenAPI спецификации через Orval
```

## 📜 Другие команды

```bash
npm run prepare      # Установка git-хуков Husky (выполняется автоматически после install)
npm run types        # Проверка типов TypeScript
```
