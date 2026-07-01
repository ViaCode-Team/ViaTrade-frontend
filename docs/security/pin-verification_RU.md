# Проверка безопасности PIN-кода

Статус: verification baseline для Phase 10.

Дата: 2026-07-01.

## Статус автоматических тестов

В проекте сейчас не настроен unit/integration/E2E test runner:

- нет `test` script в `package.json`;
- нет Vitest/Jest/Playwright dependency в `package.json`;
- нет существующих `*.test.*` или `*.spec.*` файлов.

Нельзя утверждать, что PIN покрыт автоматическими regression tests, пока test runner не добавлен. Текущая обязательная проверка проекта:

```bash
cmd.exe /c "npm run check:fix"
```

## Static checks

Запускать после изменений в PIN/security flow.

```bash
rg -n "TEMP_MK_COOKIE|temporary_master_key|saveTempKey|tryRestoreSessionKey|checkCookieLockState" src/shared/lib/secure-storage src/entities/security -S
```

Ожидаемо: нет совпадений.

```bash
rg -n "useLogout|handleLogout|showNoNetworkNotification|useAppNetwork" src/features/security/pin-unlock src/features/security/pin-setup -S
```

Ожидаемо: нет совпадений.

```bash
rg -n "setApiRequestGate|isPinLocked|refreshToken|skipInvalidation: true" src/entities/auth src/shared/api src/pages/profile/ui/manage-sessions -S
```

Ожидаемо: request gate есть, refresh защищен locked PIN state, profile logout использует `skipInvalidation: true`.

```bash
rg -n "SecuritySessionLockout|isSecurityLocked|PersistQueryClientProvider" src/app src/entities/security -S
```

Ожидаемо: `SecuritySessionLockout` работает внутри `QueryProvider`; `QueryProvider` ждет security readiness и использует locked persister key при lock.

```bash
rg -n "QUERY_REFETCH_INTERVAL|refetchInterval|refreshIntervalText|QUERY_REFETCH_INTERVAL_TEXT" src/widgets src/pages src/features src/shared/model src/shared/ui/list-status-bar -S
```

Ожидаемо: product-approved auto-refresh остается включенным в unlocked state. Phase 7 request gate должен блокировать эти запросы while PIN locked.

```bash
rg -n "SESSION_MASTER_KEY_KEY|persistSessionMasterKey|tryRestoreSessionMasterKey|clearPersistedSessionMasterKey" src/shared/lib/secure-storage src/entities/security -S
```

Ожидаемо: non-extractable session `CryptoKey` сохраняется после unlock, восстанавливается при security bootstrap и очищается при lock/deadline.

## Ручные browser checks

### Offline установка PIN

1. Залогиниться online.
2. Отключить сеть после загрузки app shell.
3. Завершить setup PIN через два шага: ввод и подтверждение.
4. Убедиться, что backend request во время PIN setup не отправляется.
5. Убедиться, что после setup локальное encrypted storage разблокировано.

### Network gate в locked state

1. Настроить PIN и один раз разблокировать приложение.
2. Заблокировать приложение по inactivity или вручную через локальный lock в DevTools.
3. Оставить открытой Network panel.
4. Подождать дольше auto-refresh interval.
5. Убедиться, что while locked не отправляются `me`, `refresh` и domain endpoint requests.

### Cooldown неверного PIN

1. Три раза ввести неверный PIN.
2. Убедиться, что input disabled примерно на 2 минуты.
3. После cooldown ввести еще три неверных PIN.
4. Убедиться, что cooldown вырос примерно до 5 минут.
5. Убедиться, что правильный PIN сбрасывает cooldown state.

### Поведение после reload

1. Разблокировать приложение правильным PIN.
2. Перезагрузить страницу до истечения 6-часового `unlockDeadlineAt`.
3. Убедиться, что приложение остается unlocked и восстанавливает encrypted cache без запроса PIN.
4. Заблокировать приложение или истечь `unlockDeadlineAt`, затем снова перезагрузить страницу.
5. Убедиться, что приложение просит PIN и не рендерит sensitive cached UI до unlock.

### Storage inspection

1. Открыть DevTools storage.
2. Убедиться, что cookie `viatrade_security_temporary_master_key` отсутствует.
3. Убедиться, что `viatrade_security_session_master_key` существует только пока приложение локально unlocked и удаляется после lock/deadline/local wipe.
4. Убедиться, что query cache хранится как ciphertext, а не readable JSON.
5. Убедиться, что legacy plaintext ключи personal notes/remind drafts удалены после migration.

## Pending automated coverage

Добавить после внедрения test infrastructure:

- PBKDF2/wrap/unwrap success and failure.
- Secure storage encrypt/decrypt/remove.
- Decrypt failure удаляет corrupted secure item.
- Lockout schedule: 3 failures => 2 minutes, next block => 5 minutes, max => 24 hours, success resets.
- Inactivity lock uses 15 minutes.
- Absolute lock uses 6 hours.
- Locked state blocks query persister reads and API requests.
- PIN setup works offline after app shell load.
- Locked screen has no logout button.
