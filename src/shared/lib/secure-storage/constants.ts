import { milliseconds } from '../milliseconds';
import { createStorageKey } from '../storage-key';

export const STORE_SALT_KEY = createStorageKey('security', 'salt');
export const STORE_ENCRYPTED_MK_KEY = createStorageKey('security', 'encrypted_master_key');
export const PIN_SETUP_MARK_KEY = createStorageKey('security', 'pin_setup_mark');
export const STORE_MK_IV_KEY = createStorageKey('security', 'master_key_iv');

export const LAST_UNLOCK_AT_KEY = createStorageKey('security', 'last_unlock_at');
export const UNLOCK_DEADLINE_AT_KEY = createStorageKey('security', 'unlock_deadline_at');
export const SESSION_MASTER_KEY_KEY = createStorageKey('security', 'session_master_key');
export const PIN_UNLOCK_TTL_MS = milliseconds.fromHours(6);
export const SECURITY_SESSION_CHANNEL = createStorageKey('security', 'session_channel');

export const LOCAL_AUTH_BLOCKED_KEY = createStorageKey('security', 'local_auth_blocked');

export const LEGACY_FAILED_ATTEMPTS_KEY = createStorageKey('security', 'pin_failed_attempts');
export const PIN_LOCKOUT_STATE_KEY = createStorageKey('security', 'pin_lockout_state');
export const PIN_LOCKOUT_FAILURE_THRESHOLD = 3;
export const PIN_LOCKOUT_DURATIONS_MS = [
	milliseconds.fromMinutes(2),
	milliseconds.fromMinutes(5),
	milliseconds.fromMinutes(30),
	milliseconds.fromHours(2),
	milliseconds.fromHours(6),
	milliseconds.fromHours(12),
	milliseconds.fromHours(24),
] as const;
