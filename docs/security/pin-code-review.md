# PIN-code security review

Дата ревью: 2026-07-01.

Область ревью: локальный PIN, локальное шифрование данных, TanStack Query cache, auth/logout/refresh, offline behavior, inactivity lock.

## Короткий вывод

Текущая реализация уже имеет полезный базовый слой: PIN не отправляется на backend, master key генерируется локально, query cache персистится через `secureQueryPersister`, а PIN overlay показывается до auth-check, если приложение уже заблокировано.

Но текущая модель не может честно выполнить требование "пользователь никак не может повлиять, даже через DevTools". В браузерном frontend без backend/OS secure storage/WebAuthn нельзя сделать локальный PIN, счетчик попыток, таймер блокировки и обязательность второго шага полностью tamper-proof. Пользователь с DevTools может удалять IndexedDB/localStorage/cookies, менять время, выполнять JS в origin, патчить runtime state, блокировать запросы и очищать cache storage.

Реально достижимая цель для web frontend: защита persisted local data от обычного доступа к устройству и от чтения local cache до ввода PIN. Недостижимая цель: защита от владельца браузерного окружения с DevTools или вредоносного JS, уже исполняющегося в origin.

## Текущая схема

- `src/shared/lib/secure-storage/pin.ts`:
  - хранит salt, encrypted master key, master key IV, setup mark и failed attempts в IndexedDB через `idb-keyval`;
  - выводит KEK из PIN через PBKDF2-SHA-256 (`ITERATIONS = 600000`);
  - создает random AES-GCM master key;
  - шифрует master key PIN-derived ключом;
  - после setup/unlock кладет master key в memory state и сохраняет raw master key во временную cookie.
- `src/shared/lib/secure-storage/storage.ts`:
  - шифрует persisted query cache через AES-GCM, если master key есть в памяти;
  - не читает persisted cache, если приложение locked.
- `src/entities/security/model/security.context.tsx`:
  - проверяет наличие PIN setup;
  - пытается восстановить session key из временной cookie;
  - предоставляет `isLocked`, `hasPin`, `isPinSetupMark`.
- `src/features/security/inactivity-lock/ui/inactivity-lock.tsx`:
  - блокирует приложение через 15 минут idle.
- `src/entities/security/model/use-session-lockout.ts`:
  - каждые 5 секунд проверяет временную cookie и блокирует приложение, если она исчезла.
- `src/app/router/protected-route/protected-route.tsx`:
  - не делает `me`, если есть PIN и приложение locked;
  - если user есть, но PIN еще не настроен, показывает setup или force logout.
- `src/entities/auth/api/refresh-interceptor.ts`:
  - на первый 401 автоматически вызывает `/api/Auth/refresh` и повторяет исходный request.

## Findings

### Critical: нельзя выполнить tamper-proof требования в чистом frontend

Затронутые требования: 1, 6, 8.

Сейчас критические состояния лежат локально:

- PIN setup mark: `PIN_SETUP_MARK_KEY`;
- encrypted master key/salt/IV: `STORE_*`;
- failed attempts: `FAILED_ATTEMPTS_KEY`;
- временный raw master key: `TEMP_MK_COOKIE`.

Пользователь с DevTools может удалить/изменить IndexedDB records, cookie, localStorage, runtime variables, bundled code или clock. Поэтому невозможно гарантировать:

- "нельзя повлиять на сохранение PIN";
- "нельзя повлиять на счетчик попыток";
- "нельзя пропустить второй шаг";
- "нельзя обойти таймер блокировки".

Что можно сделать:

- зафиксировать честную threat model;
- хранить persisted data только encrypted;
- удалять plaintext query memory при lock;
- сделать tamper-evident/best-effort lockout;
- не обещать защиту от DevTools;
- для настоящей стойкости использовать backend enforcement, WebAuthn с platform authenticator, native wrapper + OS keystore или server-side session state.

### Critical: 4-значный PIN имеет низкую энтропию

`src/shared/lib/crypto/index.ts` использует PBKDF2 600000 iterations, что хорошо как замедление. Но если атакующий скопирует IndexedDB с `salt + encrypted master key + IV`, 4 цифры дают только 10000 вариантов.

PBKDF2 замедляет перебор, но не делает 4-значный PIN криптографически сильным. Особенно это важно, потому что требование полностью локальное и offline: backend не может ограничить попытки.

Рекомендация для плана:

- минимум 6 цифр или passcode/passphrase;
- если продуктово нужен именно 4-digit PIN, явно документировать, что это локальная UX-защита, а не защита от offline brute-force;
- рассмотреть WebAuthn/биометрию как stronger unlock method, но это уже не "только PIN" и не везде работает одинаково offline.

### Critical: raw master key хранится в JS-readable cookie

Файлы:

- `src/shared/lib/secure-storage/cookie.ts`;
- `src/shared/lib/secure-storage/pin.ts`;
- `src/shared/lib/secure-storage/session.ts`.

`saveTempKey(rawMk)` сохраняет raw master key в cookie `TEMP_MK_COOKIE`. Cookie не `HttpOnly`, потому что она создается из JS через `js-cookie`; значит ее можно прочитать из DevTools или XSS. Это обходит PIN до истечения cookie.

Текущий timeout также не соответствует требованию 6 часов:

- `LOCKOUT_MINUTES = 60`, то есть 1 час;
- требование: принудительная блокировка через 6 часов после последнего правильного ввода.

Рекомендация:

- не хранить raw master key в cookie/localStorage/sessionStorage;
- хранить reload-continuity key только как non-extractable `CryptoKey` в IndexedDB до lock/deadline;
- после reload не требовать PIN, если `unlockDeadlineAt` еще валиден и session `CryptoKey` доступен;
- 6-часовой lock делать через deadline + browser lifecycle checks, но не через сохраненный raw key;
- честно указать: в web этот `CryptoKey` остается same-origin capability и не защищает от XSS/полного контроля runtime.

### High: offline setup PIN сейчас запрещен

Файл: `src/features/security/pin-setup/model/use-pin-setup.ts`.

`handleStep1Complete`, `handleStep2Complete` и `handleLogout` проверяют `isOnline`; при offline показывается no-network notification. Это противоречит требованию, что установка PIN должна работать без интернета.

Рекомендация:

- убрать network dependency из setup flow;
- setup должен проверять только локальную setup mark и local storage capability;
- backend не должен участвовать в создании PIN;
- после setup не делать broad `queryClient.refetchQueries()`.

### High: logout offline не может удалить Secure HttpOnly cookies

Если access/refresh tokens находятся в `Secure; HttpOnly` cookie, frontend JavaScript не может прочитать или удалить эти cookies. Offline frontend также не может отправить backend logout/revoke.

Следствие:

- настоящий logout текущей backend session offline невозможен;
- можно только локально стереть IndexedDB/localStorage/query cache и скрыть UI;
- cookie останется валидной до истечения срока или до server-side revoke;
- при возвращении online backend может снова считать пользователя авторизованным.

Рекомендация:

- убрать logout из PIN locked screen;
- в unlocked app разрешать online logout как сейчас;
- optional: добавить отдельный "clear local data on this device" только в unlocked состоянии и с текстом, что server session не завершена;
- для offline server logout нужен backend-supported pending revoke после reconnect, но это не мгновенный logout.

### High: нет возрастающей lockout-схемы после 3 ошибок

Файлы:

- `src/shared/lib/secure-storage/constants.ts`;
- `src/shared/lib/secure-storage/pin.ts`;
- `src/features/security/pin-unlock/model/use-pin-unlock.ts`.

Сейчас:

- `MAX_FAILED_ATTEMPTS = 5`;
- после достижения лимита выполняется logout/local clear;
- нет cooldown 2 min -> 5 min -> 30 min -> 2 h -> ... -> 1 day;
- счетчик попыток хранится локально и легко сбрасывается;
- удаление failed attempts сейчас трактуется как tampering и ведет к logout, но сам logout зависит от сети и local data clear не удаляет HttpOnly cookies.

Рекомендация:

- перейти на lockout policy: 3 подряд ошибки => lockoutUntil;
- schedule: 2 min, 5 min, 30 min, 2 h, 6 h, 12 h, 24 h max;
- хранить `failedAttempts`, `lockoutLevel`, `lockoutUntil`, `lastFailureAt`, `version`;
- reset после успешного PIN;
- явно указать best-effort nature, потому что DevTools может удалить state.

### High: query cache encryption есть, но не покрывает все local data

Покрыто:

- TanStack Query persisted cache шифруется через `secureQueryPersister`.

Не покрыто:

- `src/entities/note/model/note-storage.ts` хранит personal notes в `localStorage` plaintext;
- `src/entities/remind/lib/use-remind-draft.tsx` хранит remind drafts через Mantine `useLocalStorage` plaintext;
- Mantine theme в `localStorage` не sensitive;
- query memory cache остается plaintext во время unlocked UI, что неизбежно для отображения данных.

Рекомендация:

- мигрировать sensitive localStorage drafts/notes на secure storage;
- при lock отменять запросы и очищать in-memory QueryClient data, оставляя encrypted persisted cache;
- при unlock восстанавливать cache из encrypted persister;
- явно разделить sensitive и non-sensitive storage keys.

### High: в проекте есть циклические backend refetch

Требование: "никаких циклических запросов на me, refresh и вообще никаких".

Найдены `refetchInterval`:

- `src/widgets/strategies-overview/lib/use-strategies-overview.ts`;
- `src/widgets/notes-overview/lib/hooks/use-personal-notes.ts`;
- `src/pages/stocks/api/stocks-query.ts`;
- `src/features/remind/manage-reminds/lib/use-remind-list.ts`;
- `src/pages/dashboard/ui/dashboard-signals/dashboard-signals.tsx`;
- `src/pages/signals/ui/signals-overview/components/signals-overview-list.tsx`;
- `src/pages/signals/ui/signals-overview/components/signals-status-bar.tsx`;
- `src/pages/profile/ui/third-party-services/telegram-service.tsx`;
- `src/pages/profile/ui/sessions-overview/utils/use-sessions-overview.ts`.

Также есть UI text `QUERY_REFETCH_INTERVAL_TEXT = 'Автообновление: 5 мин'`.

Рекомендация:

- удалить все backend `refetchInterval`;
- оставить только manual refresh;
- query invalidation после user action допустима, но не должна запускать background polling;
- refresh token делать только request-driven на 401, не циклически, и выключать while locked/offline.

### Medium: `queryClient.refetchQueries()` после PIN setup слишком широкий

Файл: `src/features/security/pin-setup/model/use-pin-setup.ts`.

После setup выполняется `queryClient.refetchQueries()`, что может массово отправить backend requests сразу после создания PIN. Это конфликтует с требованием не создавать лишних запросов и усложняет offline setup.

Рекомендация:

- убрать broad refetch;
- после setup только обновить локальный security state и восстановить encrypted cache;
- необходимые data fetch пусть происходят route-driven/manual.

### Medium: 6-часовой lock сейчас реализован не тем механизмом

Сейчас есть:

- 15 min inactivity lock через `useIdle`;
- cookie expiration 60 min;
- polling каждые 5 секунд в `useSessionLockout`.

Нет:

- lock exactly/at least after 6 hours from last successful unlock;
- persisted `lastSuccessfulUnlockAt`;
- lifecycle checks on `visibilitychange`, `focus`, `pageshow`, `resume`;
- cross-tab sync.

Рекомендация:

- ввести `lastUnlockAt` и `lockDeadlineAt = lastUnlockAt + 6h`;
- использовать `setTimeout` на активной странице;
- дублировать checks на `visibilitychange`, `focus`, `pageshow`, `storage/BroadcastChannel`;
- при lock чистить memory key и query memory;
- если браузер спал дольше deadline, lock при следующем resume/focus.

### Medium: setup confirmation есть в UI, но не является security boundary

Файлы:

- `src/features/security/pin-setup/ui/pin-setup.tsx`;
- `src/features/security/pin-setup/model/use-pin-setup.ts`.

Сейчас два шага есть: первый PIN и confirmation. Но в браузере нельзя запретить пользователю с DevTools вызвать lower-level функцию, изменить React state или заменить handler.

Рекомендация:

- оставить two-step state machine как обязательный product flow;
- lower-level API `setupPin` не считать proof against DevTools;
- route guard должен не выпускать в app до появления валидного local PIN setup;
- документация должна не обещать невозможность bypass через DevTools.

### Medium: auto refresh interceptor может работать во время locked/offline flows

Файл: `src/entities/auth/api/refresh-interceptor.ts`.

Interceptor refresh не циклический сам по себе, но любой request с 401 запускает `/api/Auth/refresh`. Для PIN flow важно, чтобы while locked вообще не было domain requests и refresh attempts.

Рекомендация:

- добавить auth/network gate: если app locked, не делать refresh;
- на locked state отменять active requests;
- refresh только request-driven, не proactive;
- при refresh failure не делать циклы и не вызывать logout while locked.

### Medium: `clearLocalData` чистит слишком широко и не решает HttpOnly cookies

Файл: `src/shared/lib/auth/clear-local-data.ts`.

Функция чистит весь `localStorage`, `sessionStorage`, IndexedDB default store, query cache и JS cookies. Это удаляет frontend data, но не HttpOnly cookies.

Рекомендация:

- разделить `clearSensitiveLocalData`, `clearPinData`, `clearUiPreferences`;
- не обещать logout, если backend cookie не удалена;
- для online logout: сначала backend logout, потом local clear;
- для offline local wipe: clear local only + tombstone, но server session остается.

## Что уже хорошо

- PIN не отправляется на backend.
- AES-GCM используется с random 96-bit IV.
- PBKDF2 iterations достаточно высокие для UX PIN, хотя 4-digit PIN все равно слабый.
- Query persister уже asynchronous и encrypted.
- ProtectedRoute не делает `me`, когда есть PIN и app locked.
- Default QueryClient отключает global refetch on focus/reconnect/mount.
- 15-minute inactivity lock уже есть и использует shared `milliseconds`.

## Главные решения перед реализацией

1. Принять честную threat model: frontend-only PIN не защищает от DevTools/XSS/полного контроля origin.
2. Решить, остается ли 4-digit PIN. Для реальной стойкости нужен минимум 6 digits/passphrase/WebAuthn.
3. Убрать raw master key из cookie. Для reload без PIN хранить только non-extractable session `CryptoKey` до lock/deadline.
4. Убрать logout с PIN locked screen, потому что offline true logout невозможен с HttpOnly cookies.
5. Удалить backend polling/refetch intervals.
6. Мигрировать все sensitive localStorage данные в encrypted storage.
7. Ввести best-effort escalating lockout без ложного обещания tamper-proof.
