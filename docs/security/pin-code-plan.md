# PIN-code implementation plan

Цель: привести локальный PIN к честной и безопасной browser threat model, обеспечить offline setup/unlock, encrypted persisted frontend cache, отсутствие cyclic backend requests и корректное поведение logout при HttpOnly cookies.

Код на этом этапе не пишется. Этот документ является поэтапным планом работ.

## Security target

### Что должно быть гарантировано

- PIN никогда не отправляется на backend.
- Установка PIN работает offline после того, как app shell уже доступен в браузере/PWA cache.
- Persisted frontend cache с backend data хранится encrypted до успешного unlock.
- Sensitive local-only data хранится encrypted или удаляется.
- Пока app locked, UI не показывает cached sensitive data.
- Пока app locked, frontend не делает `me`, refresh или другие domain requests.
- Background polling/refetch intervals отсутствуют.
- PIN появляется после 15 минут бездействия, а не просто каждые 15 минут.
- Перезагрузка страницы не должна просить PIN, пока текущая локальная unlock-сессия не заблокирована и не истек 6-часовой deadline.
- После 6 часов от последнего успешного PIN приложение принудительно блокируется.
- После 3 неверных PIN включается возрастающая задержка.
- Setup PIN требует два UI шага: ввод и подтверждение.

### Что нельзя гарантировать в чистом web frontend

Нельзя гарантировать защиту от пользователя с DevTools/полным контролем браузера:

- он может удалить IndexedDB/localStorage/cookies;
- изменить clock;
- выполнить JS в origin;
- заменить runtime state/handlers;
- заблокировать или подменить network;
- удалить lockout state.

Если бизнес-требование "невозможно повлиять даже через DevTools" остается обязательным, нужен один из вариантов:

- backend-enforced lockout/session policy;
- WebAuthn/platform authenticator с device-backed secret;
- native desktop/mobile wrapper с OS keystore;
- server-side encrypted data model, где frontend без server grant не может расшифровать данные.

Для текущего React/Vite web frontend план ниже реализует максимально сильную локальную best-effort защиту без ложных обещаний.

## Phase 0: freeze requirements and threat model

Результат этапа: документация и согласованная модель безопасности.

Status: completed by [PIN threat model](./pin-threat-model.md) and [Russian version](./pin-threat-model_RU.md).

Tasks:

- Зафиксировать, что PIN является локальной дополнительной защитой persisted frontend data, а не заменой backend auth.
- Зафиксировать, что DevTools/XSS/full local browser control вне зоны гарантий.
- Отдельно описать "true logout" и "local wipe": true logout требует backend call, local wipe не удаляет HttpOnly cookies.
- Зафиксировать product decision: reload within a valid unlock session must not ask for PIN. This requires persisting a non-extractable session `CryptoKey` locally until lock/deadline.
- Решить длину PIN:
  - recommended: 6 digits minimum;
  - acceptable only as UX shield: 4 digits with explicit warning in docs.

Acceptance:

- Product/security docs не содержат обещаний "невозможно обойти через DevTools".
- Требование offline logout переформулировано: "offline local wipe possible; true server logout impossible until online".

## Phase 1: storage inventory and sensitivity map

Результат этапа: список всех persisted frontend данных и их storage policy.

Status: completed by [Frontend storage inventory](./storage-inventory.md) and [Russian version](./storage-inventory_RU.md).

Known storage:

- Encrypted IndexedDB via query persister:
  - TanStack Query persisted cache.
- Plain localStorage:
  - personal notes in `src/entities/note/model/note-storage.ts`;
  - remind drafts in `src/entities/remind/lib/use-remind-draft.tsx`;
  - Mantine color scheme, non-sensitive.
- IndexedDB via `idb-keyval`:
  - PIN salt/encrypted master key/IV/setup mark/failed attempts.
- JS-readable cookies:
  - temporary master key, should be removed.
- HttpOnly backend cookies:
  - not readable/removable by frontend.

Tasks:

- Mark each storage key as `sensitive`, `security_metadata`, `ui_preference`, or `non_sensitive_cache`.
- Sensitive data must use encrypted storage or be cleared on lock/logout.
- UI preferences may stay plaintext.
- Security metadata may be plaintext only if it is not treated as tamper-proof.

Acceptance:

- No sensitive data remains in plaintext localStorage/sessionStorage/CacheStorage.
- Query persisted cache remains encrypted at rest.
- Theme preference remains plaintext and out of sensitive clear if desired.

## Phase 2: key hierarchy redesign

Результат этапа: PIN unlock does not store raw master key in JS-readable persistent storage.

Status: completed in Phase 2 implementation and updated by reload-continuity requirement. Raw master key is not stored in cookies/localStorage/sessionStorage; a non-extractable session `CryptoKey` is persisted in IndexedDB until lock, local wipe, or `unlockDeadlineAt`.

Recommended key hierarchy:

- `PIN` -> PBKDF2/SHA-256 -> KEK.
- Random AES-GCM `masterKey` encrypts persisted app data.
- `masterKey` is wrapped/encrypted by KEK and stored in IndexedDB.
- On unlock:
  - derive KEK from entered PIN;
  - decrypt wrapped master key;
  - import master key as non-extractable if possible;
  - keep it in memory and persist the non-extractable `CryptoKey` for reload continuity.
- On lock:
  - remove memory master key;
  - remove persisted session `CryptoKey`;
  - cancel active queries;
  - clear plaintext query memory.

Tasks:

- Remove `TEMP_MK_COOKIE` and `saveTempKey(rawMk)` usage.
- Remove cookie-based session restore.
- Replace cookie expiration with explicit `lastUnlockAt`/`unlockDeadlineAt` state.
- Ensure CryptoKey is not exportable after unlock unless there is a proven need.
- Persist only the non-extractable `CryptoKey`, not raw key bytes, and restore it only before `unlockDeadlineAt`.
- Version encrypted payload metadata for future migrations.

Tradeoff:

- Reload continuity in a web app requires persisted same-origin key capability. A non-extractable `CryptoKey` prevents raw key export, but arbitrary JavaScript running in the origin can still use it while it exists.
- Stronger protection against XSS/DevTools requires WebAuthn/platform-backed storage, native wrapper, or backend grant.

Acceptance:

- DevTools cannot read raw master key from cookies/localStorage/sessionStorage.
- A full page reload before `unlockDeadlineAt` restores the local unlock session without asking PIN.
- A full page reload after lock/deadline does not leak decrypted cache and asks PIN again.
- Existing encrypted cache can be migrated or invalidated safely.

## Phase 3: encrypted cache and local data

Результат этапа: all persisted sensitive frontend data is encrypted before unlock.

Status: completed in Phase 3 implementation. Query memory is cleared on lock, persisted query cache remains encrypted, personal notes and remind drafts use secure storage with legacy plaintext migration.

Tasks:

- Keep `secureQueryPersister`, but harden behavior:
  - if locked, `getItem` returns null;
  - if locked, `setItem` no-ops;
  - on decrypt failure, remove only corrupted secure cache key.
- On lock:
  - call `queryClient.cancelQueries()`;
  - clear/remove in-memory query data so locked UI cannot display stale plaintext;
  - keep encrypted persisted cache in IndexedDB.
- On unlock:
  - restore encrypted query cache after master key is available;
  - do not run broad `queryClient.refetchQueries()`.
- Migrate personal notes from plaintext localStorage to secure storage.
- Migrate remind drafts from Mantine `useLocalStorage` to secure storage or drop drafts on lock.
- Keep Mantine theme plaintext.
- Add migration from old plaintext keys:
  - when unlocked and old plaintext key exists, encrypt and delete old key;
  - if locked, do not read plaintext sensitive data into UI.

Acceptance:

- IndexedDB query cache value is ciphertext, not readable JSON.
- `viatrade_notes_personal` plaintext key is absent after migration.
- remind draft plaintext keys are absent after migration.
- Locked app has no sensitive query data in memory.

## Phase 4: PIN setup flow

Результат этапа: setup PIN works offline and always requires confirmation in normal app flow.

Status: completed in Phase 4 implementation. PIN setup has no network checks, no logout call, no broad refetch; missing setup mark uses local auth block and local data clear.

Tasks:

- Remove `isOnline` checks from PIN setup step 1 and step 2.
- Setup should depend only on:
  - local setup mark;
  - WebCrypto availability;
  - IndexedDB/storage availability;
  - confirmation matching first PIN.
- Keep two-step state machine:
  - step 1: enter PIN;
  - step 2: confirm PIN;
  - only matching confirmation calls setup.
- Do not call backend logout if setup mark is missing while offline.
- Replace force logout on missing setup mark with a local auth-block state or local wipe policy, because true logout may be impossible offline.
- Remove `queryClient.refetchQueries()` after setup.
- After setup:
  - clear setup mark;
  - set security state unlocked;
  - allow route-driven queries.

Acceptance:

- User can login online, then lose network, then complete PIN setup offline.
- No request is sent while completing PIN setup.
- Direct navigation to private routes cannot enter app until local PIN setup exists.
- Normal UI cannot skip confirmation.

Security note:

- DevTools bypass of the UI state machine cannot be prevented in pure frontend. Do not claim otherwise.

## Phase 5: unlock flow and escalating lockout

Результат этапа: after 3 wrong attempts, increasing cooldown is enforced best-effort locally.

Status: completed in Phase 5 implementation. Failed PIN entries use versioned local lockout metadata, every third failure starts an escalating cooldown, successful unlock resets lockout state, and the locked PIN screen no longer exposes backend logout.

Policy:

- Count consecutive failed PIN entries.
- Before each attempt, check `lockoutUntil`.
- If `now < lockoutUntil`, block input and show remaining time.
- Every third consecutive failure sets a cooldown.
- Cooldown sequence:
  - 2 minutes;
  - 5 minutes;
  - 30 minutes;
  - 2 hours;
  - 6 hours;
  - 12 hours;
  - 24 hours max.
- Successful PIN resets `failedAttempts`, `lockoutLevel`, `lockoutUntil`.

Tasks:

- Replace `MAX_FAILED_ATTEMPTS = 5` logout behavior.
- Store lockout state with versioned metadata.
- Use shared `milliseconds` utility for all durations.
- Show remaining cooldown without sending requests.
- Disable PIN input during cooldown.
- Use lifecycle/focus checks to update remaining time.
- Do not logout automatically on wrong PIN.

Hard truth:

- This lockout is best-effort. A user with DevTools can delete or modify local lockout metadata.
- Tamper-proof lockout requires backend or platform secure storage.

Acceptance:

- 3 wrong PIN attempts trigger 2-minute lock.
- Next 3 wrong attempts after cooldown trigger 5-minute lock.
- Cooldown grows up to 24 hours.
- Correct PIN resets cooldown.
- No backend request is made during failed attempts or cooldown.

## Phase 6: inactivity and 6-hour absolute lock

Результат этапа: PIN appears only after inactivity or 6-hour absolute unlock lifetime.

Status: completed in Phase 6 implementation. Inactivity lock still uses 15 minutes from user activity, absolute 6-hour lock uses `unlockDeadlineAt` with `setTimeout` plus `visibilitychange`/`focus`/`pageshow` checks, and lock/deadline events are synchronized through `BroadcastChannel`.

Tasks:

- Keep 15-minute inactivity lock through idle events.
- Ensure inactivity timer resets only on real user activity:
  - pointer/mouse/touch;
  - keyboard;
  - scroll;
  - visibility/focus where appropriate.
- Add absolute lock:
  - on successful unlock, set `lastUnlockAt`;
  - compute `lockDeadlineAt = lastUnlockAt + 6h`;
  - schedule `setTimeout` until deadline;
  - check deadline on `visibilitychange`, `focus`, `pageshow`, and app bootstrap.
- Remove 5-second cookie polling in `useSessionLockout`.
- Use BroadcastChannel or storage event to sync lock/unlock across tabs.

Implementation note:

- Reload continuity stores a non-extractable session `CryptoKey` until lock/deadline. Cross-tab sync broadcasts lock and deadline updates; a tab that starts while the deadline is valid can restore the key locally from IndexedDB.
- On lock:
  - clear memory master key;
  - cancel queries;
  - clear plaintext query memory;
  - render PIN overlay.

Acceptance:

- Active user is not locked every 15 minutes.
- Idle user is locked after 15 minutes.
- User is locked after 6 hours from last correct PIN even if active.
- Sleeping tab locks on resume if deadline passed.
- No polling request or polling cookie check is needed.

## Phase 7: auth, logout, and refresh rules

Результат этапа: no auth calls while locked; logout behavior is honest with HttpOnly cookies.

Status: completed in Phase 7 implementation. Locked PIN screens expose no logout, PIN setup has no logout/network dependency, `ky` blocks non-entry API requests while a configured PIN is locked, refresh retry returns false while locked, and unlocked profile logout skips generated query resets before local cleanup.

Tasks:

- Remove "Выйти из аккаунта" from PIN locked screen.
- During PIN setup, avoid presenting logout as offline-capable.
- For unlocked app:
  - online logout calls backend logout, then clears local data;
  - offline true logout is unavailable because HttpOnly cookies cannot be deleted;
  - optional separate action: "clear local data on this device" with explicit copy that server session remains active.
- Add request gate:
  - if app locked, no domain requests;
  - if app locked, refresh interceptor returns false and does not call `/refresh`;
  - active requests are canceled on lock.
- ProtectedRoute:
  - do not call `me` while locked;
  - avoid repeated `me` checks due to route remounts;
  - use cached authenticated state only after unlock if cache can be decrypted.
- Login success:
  - set local PIN setup requirement;
  - avoid broad invalidations that cause unrelated requests before PIN setup.

Acceptance:

- Locked screen has no logout button.
- Offline locked user cannot perform fake logout.
- Online unlocked logout still clears backend session and local data.
- Offline unlocked local wipe, if implemented, does not claim server logout.
- No `/api/Auth/refresh` is called while locked.

## Phase 8: remove cyclic backend requests

Результат этапа: no periodic backend requests anywhere.

Status: retained by product decision. `refetchInterval` and `QUERY_REFETCH_INTERVAL_TEXT` are treated as an intended auto-refresh feature, not a security bug. Locked-state request gates from Phase 7 still prevent these requests while PIN is locked.

Tasks:

- Keep product-approved `QUERY_REFETCH_INTERVAL` usage for auto-refresh screens:
  - strategies overview;
  - notes overview;
  - stocks query;
  - remind list;
  - dashboard signals;
  - signals overview list/status;
  - Telegram token block;
  - sessions overview.
- Update `ListStatusBar` copy:
  - keep auto-refresh label;
  - keep throttle for manual refresh.
- Keep QueryClient global defaults:
  - no refetch on focus;
  - no refetch on reconnect;
  - no refetch interval.
- Keep locked-state API request gate from Phase 7 so auto-refresh cannot send requests while PIN is locked.
- Keep mutation invalidation only as direct result of user actions.

Acceptance:

- Product-approved auto-refresh remains visible and working while unlocked.
- Network panel shows no `me`, `refresh`, or domain polling requests while PIN is locked.
- Manual refresh buttons still work when online.

## Phase 9: routing and provider ordering

Результат этапа: security state gates query restoration and routing deterministically.

Status: completed in Phase 9 implementation. `SecurityProvider` initializes security state before `QueryProvider`, query persistence waits for `isReady`, locked/local-auth-blocked states use a locked persister key, and session deadline lockout now runs inside `QueryProvider` through `SecuritySessionLockout` so QueryClient access is valid.

Tasks:

- SecurityProvider initializes before QueryProvider restoration.
- QueryProvider should not restore encrypted cache until security state is ready and unlocked.
- Locked route renders PIN overlay before auth redirects.
- First login path:
  - backend login succeeds;
  - local setup mark is set;
  - app shows PIN setup;
  - no sensitive domain data is rendered before setup.
- Existing user path:
  - app bootstrap checks local PIN metadata;
  - if PIN exists and no memory key, locked;
  - after PIN unlock, query cache restore and route render.

Acceptance:

- No blank loops between `ProtectedRoute`, `QueryProvider`, and `SecurityProvider`.
- No domain query starts before security gate allows it.
- Reload with PIN configured restores unlocked state if the persisted session key exists and `unlockDeadlineAt` is valid; otherwise it shows PIN overlay before sensitive UI.

## Phase 10: tests and verification

Результат этапа: regression coverage for PIN/security flows.

Status: completed as verification baseline by [PIN security verification](./pin-verification.md) and [Russian version](./pin-verification_RU.md). Automated regression tests remain pending because the project currently has no configured test runner or `test` script.

Unit/integration tests:

- PBKDF2/wrap/unwrap success and failure.
- Secure storage encrypt/decrypt/remove.
- Decrypt failure clears corrupted item.
- Lockout schedule:
  - 3 failures => 2 min;
  - next block => 5 min;
  - max => 24 h;
  - success resets.
- Inactivity lock uses 15 minutes.
- Absolute lock uses 6 hours.
- Locked state blocks query persister reads.

E2E/browser tests:

- Install/setup PIN offline after app shell is loaded.
- Wrong PIN cooldown disables input.
- Correct PIN unlocks and restores encrypted cache.
- Refresh browser after unlock restores unlocked state without PIN while the session key and `unlockDeadlineAt` are valid.
- Refresh browser after lock or expired `unlockDeadlineAt` asks PIN again.
- Locked state makes no `me`, `refresh`, or domain requests.
- No periodic network requests for 10+ minutes idle/active.
- Logout button absent on PIN locked screen.
- Online logout clears local data after backend success.
- Offline local wipe, if implemented, does not claim backend logout.

Manual DevTools checks:

- IndexedDB query cache is ciphertext, not readable JSON.
- IndexedDB `viatrade_security_session_master_key` exists only while locally unlocked and before deadline.
- Plaintext notes/remind drafts are gone.
- No `viatrade_security_temporary_master_key` cookie exists.
- Network panel has no polling.

Final project verification:

- Run exactly `cmd.exe /c "npm run check:fix"` on Windows after implementation or documentation changes.

## Suggested implementation order

1. Update threat model docs and remove impossible claims from UI/docs.
2. Remove raw master key cookie and cookie polling.
3. Implement lock lifecycle: memory key only, lock cleanup, 15-minute idle, 6-hour deadline.
4. Harden QueryProvider restore and lock clearing.
5. Migrate plaintext local sensitive storage.
6. Make PIN setup fully offline and remove broad refetch.
7. Implement escalating lockout.
8. Remove logout from locked PIN flow; clarify unlocked offline local wipe vs true logout.
9. Keep approved auto-refresh intervals, but ensure locked-state request gates block them.
10. Add tests and run final verification.

## Files likely to change during implementation

- `src/shared/lib/secure-storage/*`
- `src/shared/lib/crypto/index.ts`
- `src/entities/security/model/*`
- `src/features/security/pin-setup/*`
- `src/features/security/pin-unlock/*`
- `src/features/security/inactivity-lock/*`
- `src/app/providers/query-provider/*`
- `src/app/router/protected-route/protected-route.tsx`
- `src/entities/auth/api/refresh-interceptor.ts`
- `src/shared/api/client/unauthorized-retry.ts`
- `src/shared/lib/auth/clear-local-data.ts`
- `src/entities/note/model/note-storage.ts`
- `src/entities/remind/lib/use-remind-draft.tsx`
- all files currently passing `refetchInterval`
- affected status bar components that mention auto-refresh

## Non-goals

- Do not send PIN, derived keys, master key, failed attempts, or lockout state to backend.
- Do not introduce auth/refresh loops while PIN is locked.
- Do not claim offline true logout while auth cookies are HttpOnly.
- Do not claim tamper-proof local lockout in a browser-only app.
