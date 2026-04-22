[English](./README.md)

# ViaTrade фронтенд

Современное веб-приложение для инвестиционного анализа, работы с торговыми сигналами и связанных пользовательских сценариев.

> [!WARNING]
> **В разработке.** Проект находится в активной разработке. Некоторые функции могут быть неполными или подвержены изменениям.

## Ключевые возможности

todo Ключевые возможности...

## Технологический стек

| Зона             | Технологии                                    |
| ---------------- | --------------------------------------------- |
| Основа           | React 19, TypeScript 5, Vite 7                |
| Роутинг и данные | React Router 7, TanStack Query 5              |
| UI и стили       | Mantine 9, Tabler Icons, CSS Modules, PostCSS |
| Инструменты и DX | ESLint, Prettier, Husky                       |
| API и моки       | Orval, MSW                                    |

## Требования

- Node.js совместимые с `package.json`
- npm или другой совместимый пакетный менеджер

## Быстрый старт

Клонируйте репозиторий и перейдите в папку проекта:

```bash
git clone <repository-url>
cd SkillSwap
```

Установить зависимости:

```bash
npm install
```

Запустить Vite dev server:

```bash
npm run dev
```

## Команды

| Команда              | Назначение                                             |
| -------------------- | ------------------------------------------------------ |
| `npm run dev`        | Запустить Vite dev server                              |
| `npm run build`      | Выполнить TypeScript build и собрать production bundle |
| `npm run preview`    | Локально открыть production build                      |
| `npm run api:gen`    | Сгенерировать API-клиент и типы через Orval            |
| `npm run types`      | Проверить TypeScript-типы приложения                   |
| `npm run lint`       | Запустить ESLint                                       |
| `npm run lint:fix`   | Запустить ESLint с автоисправлением                    |
| `npm run format`     | Проверить форматирование через Prettier                |
| `npm run format:fix` | Применить форматирование Prettier                      |
| `npm run check`      | Запустить `types`, `lint` и `format`                   |
| `npm run check:fix`  | Запустить `types`, `lint:fix` и `format:fix`           |
| `npm run prepare`    | Установить Husky hooks                                 |

## Вклад в проект

Мы приветствуем ваши contributions! Следуйте этим шагам:

1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b <feature/amazing-feature>`)
3. Закоммитьте изменения, используя [Conventional Commits](https://www.conventionalcommits.org/)
4. Запушьте ветку (`git push origin <feature/amazing-feature>`)
5. Откройте Pull Request
