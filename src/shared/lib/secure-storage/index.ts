import {
	decryptBuffer,
	decryptText,
	deriveKeyFromPin,
	encryptBuffer,
	encryptText,
	exportKey,
	generateIv,
	generateMasterKey,
	generateSalt,
	importKey,
} from '../crypto';
import { idbDelete, idbGet, idbSet } from '../idb';

const STORE_SALT_KEY = 'sec_salt';
const STORE_ENCRYPTED_MK_KEY = 'sec_mk_enc';
const STORE_MK_IV_KEY = 'sec_mk_iv';

const TEMP_MK_COOKIE = 'sec_mk_temp';
const LOCKOUT_MINUTES = 15;
const FAILED_ATTEMPTS_KEY = 'pin_failed_attempts';

export const MAX_FAILED_ATTEMPTS = 5;

// In-memory master key
let sessionMasterKey: CryptoKey | null = null;

function toBase64(arr: Uint8Array): string {
	return btoa(String.fromCharCode.apply(null, Array.from(arr)));
}

function fromBase64(b64: string): Uint8Array {
	const str = atob(b64);
	const arr = new Uint8Array(str.length);
	for (let i = 0; i < str.length; i++) {
		arr[i] = str.charCodeAt(i);
	}
	return arr;
}

function getCookieOptions(): string {
	const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
	return `path=/; samesite=strict${isHttps ? '; Secure' : ''}`;
}

export function getFailedAttempts(): number {
	const saved = localStorage.getItem(FAILED_ATTEMPTS_KEY);
	return saved ? Number.parseInt(saved, 10) : 0;
}

export function recordFailedAttempt(): number {
	const current = getFailedAttempts();
	const next = current + 1;
	localStorage.setItem(FAILED_ATTEMPTS_KEY, next.toString());
	return next;
}

export function resetFailedAttempts(): void {
	localStorage.removeItem(FAILED_ATTEMPTS_KEY);
}

export async function hasPinSetup(): Promise<boolean> {
	const salt = await idbGet<Uint8Array>(STORE_SALT_KEY);
	const encMk = await idbGet<Uint8Array>(STORE_ENCRYPTED_MK_KEY);
	return !!(salt && encMk);
}

export function isAppLocked(): boolean {
	return sessionMasterKey === null;
}

export function lockApp(): void {
	sessionMasterKey = null;
	document.cookie = `${TEMP_MK_COOKIE}=; max-age=0; ${getCookieOptions()}`;
}

export function checkCookieLockState(): boolean {
	const match = document.cookie.match(new RegExp(`(?:^|; )${TEMP_MK_COOKIE}=([^;]*)`));
	return !!(match && match[1]);
}

function saveTempKey(rawMk: Uint8Array) {
	const b64 = toBase64(rawMk);
	document.cookie = `${TEMP_MK_COOKIE}=${b64}; max-age=${LOCKOUT_MINUTES * 60}; ${getCookieOptions()}`;
}

export async function tryRestoreSessionKey(): Promise<boolean> {
	const match = document.cookie.match(new RegExp(`(?:^|; )${TEMP_MK_COOKIE}=([^;]*)`));
	const tempKeyB64 = match ? match[1] : null;

	if (tempKeyB64) {
		try {
			const rawMk = fromBase64(tempKeyB64);
			sessionMasterKey = await importKey(rawMk);
			return true;
		}
		catch (e) {
			console.error('Failed to restore temp key', e);
		}
	}

	// Cleanup if expired or invalid
	lockApp();
	return false;
}

export async function setupPin(pin: string): Promise<void> {
	const salt = generateSalt();
	const kek = await deriveKeyFromPin(pin, salt);

	const mk = await generateMasterKey();
	const rawMk = await exportKey(mk);

	const iv = generateIv();
	const encryptedMk = await encryptBuffer(rawMk, kek, iv);

	await idbSet(STORE_SALT_KEY, salt);
	await idbSet(STORE_ENCRYPTED_MK_KEY, encryptedMk);
	await idbSet(STORE_MK_IV_KEY, iv);

	sessionMasterKey = mk;
	saveTempKey(rawMk);
}

export async function unlockApp(pin: string): Promise<boolean> {
	try {
		const salt = await idbGet<Uint8Array>(STORE_SALT_KEY);
		const encryptedMk = await idbGet<Uint8Array>(STORE_ENCRYPTED_MK_KEY);
		const iv = await idbGet<Uint8Array>(STORE_MK_IV_KEY);

		if (!salt || !encryptedMk || !iv) {
			throw new Error('PIN is not set up properly.');
		}

		const kek = await deriveKeyFromPin(pin, salt);
		const rawMk = await decryptBuffer(encryptedMk, kek, iv);

		sessionMasterKey = await importKey(rawMk);
		saveTempKey(rawMk);
		return true;
	}
	catch (e) {
		console.error('Failed to unlock app', e);
		return false;
	}
}

export async function secureSetItem(key: string, value: string): Promise<void> {
	if (!sessionMasterKey) {
		throw new Error('Cannot write to secure storage. App is locked.');
	}
	const iv = generateIv();
	const ciphertext = await encryptText(value, sessionMasterKey, iv);
	await idbSet(key, { iv, ciphertext });
}

export async function secureGetItem(key: string): Promise<string | null> {
	if (!sessionMasterKey) {
		// App is locked, we can't read data.
		return null;
	}
	const data = await idbGet<{ iv: Uint8Array; ciphertext: Uint8Array }>(key);
	if (!data)
		return null;

	try {
		return await decryptText(data.ciphertext, sessionMasterKey, data.iv);
	}
	catch (e) {
		console.error(`Failed to decrypt item ${key}`, e);
		return null;
	}
}

export async function secureRemoveItem(key: string): Promise<void> {
	await idbDelete(key);
}

// TanStack Query Async Storage Interface
export const secureQueryPersister = {
	setItem: async (key: string, value: string) => {
		if (isAppLocked())
			return; // Don't persist if locked
		await secureSetItem(key, value);
	},
	getItem: async (key: string) => {
		if (isAppLocked())
			return null; // Can't read if locked
		return await secureGetItem(key);
	},
	removeItem: async (key: string) => {
		await secureRemoveItem(key);
	},
};
