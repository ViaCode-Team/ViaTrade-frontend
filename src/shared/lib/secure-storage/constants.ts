import { createStorageKey } from '../storage-key';

export const STORE_SALT_KEY = createStorageKey('security', 'salt');
export const STORE_ENCRYPTED_MK_KEY = createStorageKey('security', 'encrypted_master_key');
export const PIN_SETUP_MARK_KEY = createStorageKey('security', 'pin_setup_mark');
export const STORE_MK_IV_KEY = createStorageKey('security', 'master_key_iv');

export const TEMP_MK_COOKIE = createStorageKey('security', 'temporary_master_key');
export const LOCKOUT_MINUTES = 60;

export const FAILED_ATTEMPTS_KEY = createStorageKey('security', 'pin_failed_attempts');
export const MAX_FAILED_ATTEMPTS = 5;
