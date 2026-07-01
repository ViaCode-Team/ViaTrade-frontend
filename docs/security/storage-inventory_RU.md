# Инвентаризация frontend storage

Статус: принятая базовая карта для PIN Phase 1.

Дата: 2026-07-01.

Область: persistent browser storage, который использует frontend и который связан с PIN, encrypted cache, auth, offline behavior и локальной очисткой данных.

## Классификация

- `sensitive`: пользовательские/backend данные или key material. Должны храниться зашифрованно или удаляться.
- `security_metadata`: локальное security state. Может быть plaintext только если не считается tamper-proof.
- `ui_preference`: нечувствительное UI state. Может оставаться plaintext.
- `app_cache`: статический app shell/assets. Не должен содержать пользовательские данные.
- `server_owned`: состояние backend, недоступное для чтения/удаления из frontend JavaScript.

## Карта storage

| Storage                                | Ключ / pattern                             | Источник                                                                                          | Классификация       | Сейчас                                                                                                     | Целевая policy                                                                                         |
| -------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| IndexedDB через `idb-keyval`           | `viatrade_query_cache`                     | `src/app/providers/query-provider/query-provider.tsx`, `src/shared/lib/secure-storage/storage.ts` | `sensitive`         | Шифруется через `secureQueryPersister`, когда master key доступен.                                         | Оставить encrypted. Не читать while locked. Очищать plaintext QueryClient memory при lock.             |
| localStorage                           | `viatrade_notes_personal`                  | `src/entities/note/model/note-storage.ts`                                                         | `sensitive`         | Plain JSON с локальными personal notes и source metadata.                                                  | Мигрировать в secure storage на Phase 3, затем удалить plaintext key.                                  |
| localStorage                           | `viatrade_reminds_drafts_<remindId>`       | `src/entities/remind/lib/use-remind-draft.tsx`                                                    | `sensitive`         | Plain reminder draft text/date/time через Mantine `useLocalStorage`.                                       | Мигрировать в secure storage или удалять при lock на Phase 3, затем удалить plaintext keys.            |
| localStorage                           | `mantine-color-scheme-value`               | `public/scripts/theme-init.js`, Mantine color scheme manager                                      | `ui_preference`     | Plain theme preference.                                                                                    | Может оставаться plaintext и вне sensitive migration.                                                  |
| localStorage                           | `viatrade_layout_desktop_sidebar_expanded` | `src/app/layouts/dashboard-layout/use-dashboard-sidebar.ts`                                       | `ui_preference`     | Plain sidebar preference.                                                                                  | Может оставаться plaintext.                                                                            |
| IndexedDB через `idb-keyval`           | `viatrade_security_salt`                   | `src/shared/lib/secure-storage/constants.ts`                                                      | `security_metadata` | Plain PBKDF2 salt.                                                                                         | Оставить plaintext. Не является секретом.                                                              |
| IndexedDB через `idb-keyval`           | `viatrade_security_encrypted_master_key`   | `src/shared/lib/secure-storage/constants.ts`                                                      | `sensitive`         | Encrypted/wrapped master key.                                                                              | Хранить только encrypted. Добавить versioned payload metadata на Phase 2/3.                            |
| IndexedDB через `idb-keyval`           | `viatrade_security_master_key_iv`          | `src/shared/lib/secure-storage/constants.ts`                                                      | `security_metadata` | Plain AES-GCM IV для wrapped master key.                                                                   | Оставить plaintext. Не секрет, но должен соответствовать encrypted master key.                         |
| IndexedDB через `idb-keyval`           | `viatrade_security_session_master_key`     | `src/shared/lib/secure-storage/constants.ts`                                                      | `sensitive`         | Non-extractable AES-GCM `CryptoKey` хранится для восстановления unlock после reload до `unlockDeadlineAt`. | Очищать при lock, истечении deadline и local data wipe. Никогда не экспортировать raw key material.    |
| IndexedDB через `idb-keyval`           | `viatrade_security_pin_setup_mark`         | `src/shared/lib/secure-storage/constants.ts`                                                      | `security_metadata` | Plain local setup marker.                                                                                  | Оставить только как best-effort. Не считать tamper-proof.                                              |
| IndexedDB через `idb-keyval`           | `viatrade_security_pin_lockout_state`      | `src/shared/lib/secure-storage/constants.ts`                                                      | `security_metadata` | Versioned best-effort metadata неверных попыток/cooldown.                                                  | Хранить plaintext, но не считать tamper-proof. Сбрасывать после успешного PIN unlock.                  |
| IndexedDB через `idb-keyval`           | `viatrade_security_pin_failed_attempts`    | legacy `src/shared/lib/secure-storage/constants.ts`                                               | `security_metadata` | Legacy plain failed attempt counter.                                                                       | Удалять при PIN lockout reset; не писать новые значения.                                               |
| JS-readable cookie                     | `viatrade_security_temporary_master_key`   | legacy `src/shared/lib/secure-storage/cookie.ts`                                                  | `sensitive`         | Удален на Phase 2. Файл больше не хранит raw master keys.                                                  | Держать удаленным. Очищать legacy cookies при local data clear, если они есть.                         |
| JavaScript cookies                     | неизвестные non-HttpOnly cookies           | `src/shared/lib/auth/clear-local-data.ts`                                                         | mixed               | Широко очищаются при local data clear.                                                                     | Оставить очистку, но не считать ее удалением HttpOnly auth cookies.                                    |
| HttpOnly cookies                       | backend auth cookies                       | backend response, не видны во frontend code                                                       | `server_owned`      | Не читаются и не удаляются frontend JavaScript.                                                            | Настоящий logout требует backend call while online. Offline frontend может только очистить local data. |
| CacheStorage / service worker precache | app shell, JS/CSS/HTML, fonts              | `config/vite/pwa.ts`                                                                              | `app_cache`         | Только static assets; API runtime cache не найден.                                                         | Может оставаться. Не кешировать user API responses здесь.                                              |
| sessionStorage                         | не найдено                                 | результат поиска                                                                                  | none                | Persistent writes не найдены, только global clear.                                                         | Не добавлять sensitive sessionStorage usage.                                                           |

## Требования к миграции

- Sensitive localStorage keys можно мигрировать только после unlock, когда master key доступен.
- Если приложение locked, код не должен загружать plaintext sensitive legacy keys в UI.
- После успешной миграции plaintext keys должны удаляться.
- Если encrypted migration не удалась, временно оставить old key и показывать recoverable error только в unlocked UI.
- Query cache уже encrypted; Phase 3 должен усилить lock/unlock memory handling, а не заменять persister без причины.
- Persisted session `CryptoKey` нужен только для reload continuity. Он должен очищаться при lock или истечении absolute unlock deadline.

## Clear policies

### Lock

- Удалить in-memory master key.
- Удалить persisted session `CryptoKey`.
- Отменить active queries.
- Очистить или удалить plaintext in-memory QueryClient data.
- Оставить encrypted persisted cache.
- Не очищать UI preferences.

### Online true logout

- Сначала вызвать backend logout.
- Очистить encrypted cache, sensitive local data и PIN/session local state согласно product flow.
- Очистить QueryClient memory.
- Очистить JS-readable cookies.
- Не утверждать, что frontend напрямую удалил HttpOnly cookies.

### Offline local wipe

- Очистить encrypted cache и sensitive local data.
- Очистить QueryClient memory.
- Очистить JS-readable cookies.
- Явно указать, что backend session cookies могут оставаться валидными до server logout или expiry.

## Phase 1 acceptance status

- Каждый найденный persistent frontend storage key классифицирован.
- Sensitive plaintext localStorage определен для Phase 3 migration.
- JS-readable raw master key cookie определен для удаления на Phase 2.
- Sensitive writes в sessionStorage не найдены.
- Service worker cache классифицирован как static app cache, не user data cache.
