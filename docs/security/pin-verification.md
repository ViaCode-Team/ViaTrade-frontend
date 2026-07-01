# PIN security verification

Status: Phase 10 verification baseline.

Date: 2026-07-01.

## Automated test status

The project currently has no configured unit, integration, or E2E test runner:

- no `test` script in `package.json`;
- no Vitest/Jest/Playwright dependency in `package.json`;
- no existing `*.test.*` or `*.spec.*` files.

Do not claim automated PIN regression coverage until a test runner is added. Current mandatory project verification is:

```bash
cmd.exe /c "npm run check:fix"
```

## Static checks

Run these checks after PIN/security changes.

```bash
rg -n "TEMP_MK_COOKIE|temporary_master_key|saveTempKey|tryRestoreSessionKey|checkCookieLockState" src/shared/lib/secure-storage src/entities/security -S
```

Expected: no matches.

```bash
rg -n "useLogout|handleLogout|showNoNetworkNotification|useAppNetwork" src/features/security/pin-unlock src/features/security/pin-setup -S
```

Expected: no matches.

```bash
rg -n "setApiRequestGate|isPinLocked|refreshToken|skipInvalidation: true" src/entities/auth src/shared/api src/pages/profile/ui/manage-sessions -S
```

Expected: request gate exists, refresh is guarded by locked PIN state, profile logout uses `skipInvalidation: true`.

```bash
rg -n "SecuritySessionLockout|isSecurityLocked|PersistQueryClientProvider" src/app src/entities/security -S
```

Expected: `SecuritySessionLockout` runs inside `QueryProvider`; `QueryProvider` waits for security readiness and uses a locked persister key while locked.

```bash
rg -n "QUERY_REFETCH_INTERVAL|refetchInterval|refreshIntervalText|QUERY_REFETCH_INTERVAL_TEXT" src/widgets src/pages src/features src/shared/model src/shared/ui/list-status-bar -S
```

Expected: product-approved auto-refresh remains present while unlocked. Phase 7 request gate must still block these requests while PIN is locked.

```bash
rg -n "SESSION_MASTER_KEY_KEY|persistSessionMasterKey|tryRestoreSessionMasterKey|clearPersistedSessionMasterKey" src/shared/lib/secure-storage src/entities/security -S
```

Expected: non-extractable session `CryptoKey` is persisted after unlock, restored during security bootstrap, and cleared on lock/deadline.

## Manual browser checks

### PIN setup offline

1. Login online.
2. Disconnect network after the app shell is loaded.
3. Complete PIN setup with both entry and confirmation steps.
4. Confirm no backend request is sent during PIN setup.
5. Confirm app unlocks local encrypted storage after setup.

### Locked state network gate

1. Configure PIN and unlock once.
2. Lock the app by inactivity or manually triggering local lock in DevTools.
3. Keep Network panel open.
4. Wait longer than the auto-refresh interval.
5. Confirm no `me`, `refresh`, or domain endpoint request is sent while locked.

### Wrong PIN cooldown

1. Enter wrong PIN three times.
2. Confirm input is disabled for about 2 minutes.
3. After cooldown, enter three more wrong PINs.
4. Confirm cooldown increases to about 5 minutes.
5. Confirm a correct PIN resets the cooldown state.

### Reload behavior

1. Unlock with correct PIN.
2. Reload the page before the 6-hour `unlockDeadlineAt`.
3. Confirm the app stays unlocked and restores encrypted cache without asking PIN.
4. Lock the app or expire `unlockDeadlineAt`, then reload again.
5. Confirm the app asks for PIN and does not render sensitive cached UI before unlock.

### Storage inspection

1. Open DevTools storage.
2. Confirm no `viatrade_security_temporary_master_key` cookie exists.
3. Confirm `viatrade_security_session_master_key` exists only while locally unlocked and is removed after lock/deadline/local wipe.
4. Confirm query cache is ciphertext, not readable JSON.
5. Confirm plaintext personal notes and remind draft legacy keys are removed after migration.

## Pending automated coverage

Add automated tests when test infrastructure is introduced:

- PBKDF2/wrap/unwrap success and failure.
- Secure storage encrypt/decrypt/remove.
- Decrypt failure removes corrupted secure item.
- Lockout schedule: 3 failures => 2 minutes, next block => 5 minutes, max => 24 hours, success resets.
- Inactivity lock uses 15 minutes.
- Absolute lock uses 6 hours.
- Locked state blocks query persister reads and API requests.
- PIN setup works offline after app shell load.
- Locked screen has no logout button.
