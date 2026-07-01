# Frontend storage inventory

Status: accepted baseline for PIN Phase 1.

Date: 2026-07-01.

Scope: persisted browser storage used by the frontend and relevant to PIN, encrypted cache, auth, offline behavior, and local data wiping.

## Classification

- `sensitive`: user/backend data or key material. Must be encrypted at rest or removed.
- `security_metadata`: local security state. May be plaintext only when not treated as tamper-proof.
- `ui_preference`: non-sensitive UI state. May remain plaintext.
- `app_cache`: static app shell/assets. Must not contain user data.
- `server_owned`: state owned by backend, not readable/removable by frontend JavaScript.

## Storage map

| Storage                                | Key / pattern                              | Source                                                                                            | Classification      | Current state                                                                                        | Target policy                                                                              |
| -------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| IndexedDB via `idb-keyval`             | `viatrade_query_cache`                     | `src/app/providers/query-provider/query-provider.tsx`, `src/shared/lib/secure-storage/storage.ts` | `sensitive`         | Encrypted by `secureQueryPersister` when master key is available.                                    | Keep encrypted. Do not read while locked. Clear plaintext QueryClient memory on lock.      |
| localStorage                           | `viatrade_notes_personal`                  | `src/entities/note/model/note-storage.ts`                                                         | `sensitive`         | Plain JSON with local personal notes and source metadata.                                            | Migrate to secure storage in Phase 3, then delete plaintext key.                           |
| localStorage                           | `viatrade_reminds_drafts_<remindId>`       | `src/entities/remind/lib/use-remind-draft.tsx`                                                    | `sensitive`         | Plain reminder draft text/date/time through Mantine `useLocalStorage`.                               | Migrate to secure storage or drop on lock in Phase 3, then delete plaintext keys.          |
| localStorage                           | `mantine-color-scheme-value`               | `public/scripts/theme-init.js`, Mantine color scheme manager                                      | `ui_preference`     | Plain theme preference.                                                                              | May remain plaintext and outside sensitive storage migration.                              |
| localStorage                           | `viatrade_layout_desktop_sidebar_expanded` | `src/app/layouts/dashboard-layout/use-dashboard-sidebar.ts`                                       | `ui_preference`     | Plain sidebar preference.                                                                            | May remain plaintext.                                                                      |
| IndexedDB via `idb-keyval`             | `viatrade_security_salt`                   | `src/shared/lib/secure-storage/constants.ts`                                                      | `security_metadata` | Plain PBKDF2 salt.                                                                                   | Keep plaintext. Not a secret.                                                              |
| IndexedDB via `idb-keyval`             | `viatrade_security_encrypted_master_key`   | `src/shared/lib/secure-storage/constants.ts`                                                      | `sensitive`         | Encrypted/wrapped master key.                                                                        | Keep only encrypted. Version payload metadata in Phase 2/3.                                |
| IndexedDB via `idb-keyval`             | `viatrade_security_master_key_iv`          | `src/shared/lib/secure-storage/constants.ts`                                                      | `security_metadata` | Plain AES-GCM IV for wrapped master key.                                                             | Keep plaintext. Not a secret but must match encrypted master key.                          |
| IndexedDB via `idb-keyval`             | `viatrade_security_session_master_key`     | `src/shared/lib/secure-storage/constants.ts`                                                      | `sensitive`         | Non-extractable AES-GCM `CryptoKey` stored to restore unlock across reload until `unlockDeadlineAt`. | Clear on lock, deadline expiry, and local data wipe. Never export raw key material.        |
| IndexedDB via `idb-keyval`             | `viatrade_security_pin_setup_mark`         | `src/shared/lib/secure-storage/constants.ts`                                                      | `security_metadata` | Plain local setup marker.                                                                            | Keep best-effort only. Do not treat as tamper-proof.                                       |
| IndexedDB via `idb-keyval`             | `viatrade_security_pin_lockout_state`      | `src/shared/lib/secure-storage/constants.ts`                                                      | `security_metadata` | Versioned best-effort failed attempt/cooldown metadata.                                              | Keep plaintext but do not treat as tamper-proof. Reset after successful PIN unlock.        |
| IndexedDB via `idb-keyval`             | `viatrade_security_pin_failed_attempts`    | legacy `src/shared/lib/secure-storage/constants.ts`                                               | `security_metadata` | Legacy plain failed attempt counter.                                                                 | Delete during PIN lockout reset; do not write new values.                                  |
| JS-readable cookie                     | `viatrade_security_temporary_master_key`   | legacy `src/shared/lib/secure-storage/cookie.ts`                                                  | `sensitive`         | Removed in Phase 2. The file no longer stores raw master keys.                                       | Keep removed. Clear legacy cookies during local data clear if they exist.                  |
| JavaScript cookies                     | Unknown non-HttpOnly cookies               | `src/shared/lib/auth/clear-local-data.ts`                                                         | mixed               | Cleared broadly on local data clear.                                                                 | Keep clear path, but do not rely on it for HttpOnly auth cookies.                          |
| HttpOnly cookies                       | backend auth cookies                       | backend response, not visible in frontend code                                                    | `server_owned`      | Not readable/removable by frontend JavaScript.                                                       | True logout requires backend call while online. Offline frontend can only wipe local data. |
| CacheStorage / service worker precache | app shell, JS/CSS/HTML, fonts              | `config/vite/pwa.ts`                                                                              | `app_cache`         | Static assets only; no API runtime cache found.                                                      | May remain. Do not cache user API responses here.                                          |
| sessionStorage                         | none found                                 | search result                                                                                     | none                | No persistent writes found, only global clear.                                                       | Keep no sensitive sessionStorage usage.                                                    |

## Migration requirements

- Sensitive localStorage keys must be migrated only after the app is unlocked and a master key is available.
- If the app is locked, code must not load plaintext sensitive legacy keys into UI.
- After successful migration, plaintext keys must be removed.
- If encrypted migration fails, keep the old key temporarily and show a recoverable error only in unlocked UI.
- Query cache should remain encrypted; Phase 3 should harden lock/unlock memory handling rather than replace the persister.
- The persisted session `CryptoKey` is for reload continuity only. It must be cleared when the app locks or the absolute unlock deadline expires.

## Clear policies

### Lock

- Remove in-memory master key.
- Remove persisted session `CryptoKey`.
- Cancel active queries.
- Clear or remove plaintext in-memory QueryClient data.
- Keep encrypted persisted cache.
- Do not clear UI preferences.

### Online true logout

- Call backend logout first.
- Clear encrypted cache, sensitive local data, PIN/session local state as required by product flow.
- Clear QueryClient memory.
- Clear JS-readable cookies.
- Do not claim frontend cleared HttpOnly cookies directly.

### Offline local wipe

- Clear encrypted cache and sensitive local data.
- Clear QueryClient memory.
- Clear JS-readable cookies.
- State explicitly that backend session cookies may remain valid until server logout or expiry.

## Phase 1 acceptance status

- Each known persisted frontend storage key is classified.
- Sensitive plaintext localStorage is identified for Phase 3 migration.
- JS-readable raw master key cookie is identified for Phase 2 removal.
- No sessionStorage sensitive writes were found.
- Service worker cache is classified as static app cache, not user data cache.
