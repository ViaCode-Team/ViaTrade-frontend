# PIN threat model

Status: accepted baseline for PIN-code hardening.

Date: 2026-07-01.

## Purpose

The local PIN is an additional browser-side protection layer for locally persisted frontend data. It is not a replacement for backend authentication, backend session revocation, or device-level security.

## Security goals

- The PIN, derived keys, master key, failed attempts, and lockout metadata must not be sent to the backend.
- PIN setup and unlock must work without internet access after the app shell is available locally.
- Backend data persisted by the frontend must be encrypted at rest until a successful PIN unlock.
- Sensitive local-only data must be encrypted at rest or removed.
- While the app is PIN-locked, sensitive cached data must not be rendered.
- While the app is PIN-locked, the frontend must not call `me`, `refresh`, or other domain endpoints.
- There must be no cyclic background backend requests.
- A true backend logout must be clearly separated from a local data wipe.

## Non-goals

- The local PIN does not protect against a user who fully controls the browser runtime.
- The local PIN does not make browser storage tamper-proof.
- The local PIN does not revoke backend sessions while offline.
- The local PIN does not protect data that is already rendered in the unlocked UI from DevTools inspection.

## Attacker model

### In scope

- Someone opens the app on the same browser profile after the legitimate user left the device.
- Someone reads local persistent storage from the browser profile while the app is locked.
- The app starts offline and must avoid leaking persisted cached data before PIN unlock.

### Out of scope

- User or attacker with DevTools access and full control over the origin runtime.
- XSS or malicious extension executing JavaScript in the app origin.
- Modified browser, patched bundle, changed system clock, or edited IndexedDB/localStorage/cookies.
- Compromised operating system or physical disk access outside browser protections.
- Backend compromise.

## Browser limits

In a pure web frontend, these requirements cannot be guaranteed:

- "The user cannot affect it in any way, even through DevTools."
- "The failed-attempt counter cannot be changed or reset through DevTools."
- "The setup confirmation step cannot be bypassed through DevTools."
- "True logout is possible offline when tokens are stored in `Secure; HttpOnly` cookies."

Reason: JavaScript cannot prevent the browser owner from inspecting or changing local origin storage and runtime state. JavaScript also cannot read or delete `HttpOnly` cookies, and offline JavaScript cannot ask the backend to revoke a session.

## Accepted design direction

- Treat PIN as a local encrypted-storage unlock mechanism.
- Do not persist raw master keys in JS-readable cookies, localStorage, or sessionStorage.
- Keep the unlocked session key as a non-extractable `CryptoKey` in IndexedDB until local lock, local data wipe, or `unlockDeadlineAt`.
- Restore this non-extractable `CryptoKey` after page reload while the unlock deadline is still valid, so reload does not ask for PIN.
- Do not claim this restore key is protected from XSS or arbitrary JavaScript executing in the same origin.
- Implement failed-attempt lockout as best-effort local protection, not tamper-proof enforcement.
- Remove logout from the PIN-locked screen.
- Allow true logout only when online and unlocked.
- Optionally allow "clear local data on this device" while unlocked, with explicit copy that the backend session remains active until server logout or cookie expiry.

## Stronger alternatives

If tamper-proof behavior is a hard product requirement, use one or more of:

- backend-enforced lockout/session policy;
- WebAuthn/platform authenticator;
- native desktop/mobile wrapper with OS keystore;
- server-side encrypted data model where the frontend cannot decrypt without a server grant.

## Implementation implications

- `Secure; HttpOnly` auth cookies remain backend-owned.
- Offline true logout is impossible from frontend code.
- PIN setup must not depend on network state.
- Lockout metadata can be stored locally only as best-effort/tamper-evident state.
- Documentation and UI copy must not promise protection against DevTools or full local runtime control.
