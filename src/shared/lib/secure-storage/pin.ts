import { del, get, set } from 'idb-keyval';

import {
	decryptBuffer,
	deriveKeyFromPin,
	encryptBuffer,
	exportKey,
	generateIv,
	generateMasterKey,
	generateSalt,
	importKey,
} from '../crypto';
import {
	LEGACY_FAILED_ATTEMPTS_KEY,
	PIN_LOCKOUT_DURATIONS_MS,
	PIN_LOCKOUT_FAILURE_THRESHOLD,
	PIN_LOCKOUT_STATE_KEY,
	PIN_SETUP_MARK_KEY,
	STORE_ENCRYPTED_MK_KEY,
	STORE_MK_IV_KEY,
	STORE_SALT_KEY,
} from './constants';
import { persistSessionMasterKey, recordSuccessfulUnlock } from './session';
import { setSessionMasterKey } from './state';

const PIN_LOCKOUT_STATE_VERSION = 1;

export type PinLockoutState = {
	version: typeof PIN_LOCKOUT_STATE_VERSION;
	failedAttempts: number;
	lockoutLevel: number;
	lockoutUntil: number | null;
	updatedAt: number;
};

export type PinLockoutStatus = {
	state: PinLockoutState;
	isLockedOut: boolean;
	remainingMs: number;
};

function createEmptyPinLockoutState(now = Date.now()): PinLockoutState {
	return {
		version: PIN_LOCKOUT_STATE_VERSION,
		failedAttempts: 0,
		lockoutLevel: 0,
		lockoutUntil: null,
		updatedAt: now,
	};
}

function isPinLockoutState(value: unknown): value is PinLockoutState {
	if (!value || typeof value !== 'object')
		return false;

	const state = value as Partial<PinLockoutState>;

	return state.version === PIN_LOCKOUT_STATE_VERSION
		&& typeof state.failedAttempts === 'number'
		&& typeof state.lockoutLevel === 'number'
		&& (typeof state.lockoutUntil === 'number' || state.lockoutUntil === null)
		&& typeof state.updatedAt === 'number';
}

async function getStoredPinLockoutState(now = Date.now()): Promise<PinLockoutState> {
	const state = await get<unknown>(PIN_LOCKOUT_STATE_KEY);

	if (!isPinLockoutState(state))
		return createEmptyPinLockoutState(now);

	if (state.lockoutUntil !== null && now >= state.lockoutUntil) {
		const normalizedState = {
			...state,
			lockoutUntil: null,
			updatedAt: now,
		};

		await set(PIN_LOCKOUT_STATE_KEY, normalizedState);
		return normalizedState;
	}

	return state;
}

async function setPinLockoutState(state: PinLockoutState): Promise<void> {
	await set(PIN_LOCKOUT_STATE_KEY, state);
}

export async function setPinSetupMark(): Promise<void> {
	const mark = crypto.randomUUID(); // A secure enough random mark
	await set(PIN_SETUP_MARK_KEY, mark);
}

export async function clearPinSetupMark(): Promise<void> {
	await del(PIN_SETUP_MARK_KEY);
}

export async function hasPinSetupMark(): Promise<boolean> {
	const mark = await get<string>(PIN_SETUP_MARK_KEY);
	return !!mark;
}

export async function hasPinSetup(): Promise<boolean> {
	const salt = await get<Uint8Array>(STORE_SALT_KEY);
	const encMk = await get<Uint8Array>(STORE_ENCRYPTED_MK_KEY);
	return !!(salt && encMk);
}

export async function setupPin(pin: string): Promise<void> {
	const salt = generateSalt();
	const kek = await deriveKeyFromPin(pin, salt);

	const generatedMasterKey = await generateMasterKey();
	const rawMasterKey = await exportKey(generatedMasterKey);

	const iv = generateIv();
	const encryptedMasterKey = await encryptBuffer(rawMasterKey, kek, iv);
	const sessionMasterKey = await importKey(rawMasterKey);

	await set(STORE_SALT_KEY, salt);
	await set(STORE_ENCRYPTED_MK_KEY, encryptedMasterKey);
	await set(STORE_MK_IV_KEY, iv);
	await resetPinLockout();

	setSessionMasterKey(sessionMasterKey);
	await persistSessionMasterKey(sessionMasterKey);
	await recordSuccessfulUnlock();
}

export async function unlockApp(pin: string): Promise<boolean> {
	try {
		const salt = await get<Uint8Array>(STORE_SALT_KEY);
		const encryptedMasterKey = await get<Uint8Array>(STORE_ENCRYPTED_MK_KEY);
		const iv = await get<Uint8Array>(STORE_MK_IV_KEY);

		if (!salt || !encryptedMasterKey || !iv) {
			throw new Error('PIN is not set up properly.');
		}

		const kek = await deriveKeyFromPin(pin, salt);
		const rawMasterKey = await decryptBuffer(encryptedMasterKey, kek, iv);

		const sessionMasterKey = await importKey(rawMasterKey);
		await resetPinLockout();
		setSessionMasterKey(sessionMasterKey);
		await persistSessionMasterKey(sessionMasterKey);
		await recordSuccessfulUnlock();
		return true;
	}
	catch (e) {
		console.error('Failed to unlock app', e);
		return false;
	}
}

export async function getPinLockoutStatus(now = Date.now()): Promise<PinLockoutStatus> {
	const state = await getStoredPinLockoutState(now);
	const remainingMs = state.lockoutUntil !== null
		? Math.max(state.lockoutUntil - now, 0)
		: 0;

	return {
		state,
		isLockedOut: remainingMs > 0,
		remainingMs,
	};
}

export async function recordFailedPinAttempt(now = Date.now()): Promise<PinLockoutStatus> {
	const currentState = await getStoredPinLockoutState(now);
	const failedAttempts = currentState.failedAttempts + 1;
	const shouldLockout = failedAttempts % PIN_LOCKOUT_FAILURE_THRESHOLD === 0;
	const lockoutLevel = shouldLockout
		? Math.min(currentState.lockoutLevel + 1, PIN_LOCKOUT_DURATIONS_MS.length)
		: currentState.lockoutLevel;
	const lockoutDuration = shouldLockout
		? PIN_LOCKOUT_DURATIONS_MS[lockoutLevel - 1]
		: 0;
	const lockoutUntil = shouldLockout ? now + lockoutDuration : null;

	const nextState: PinLockoutState = {
		version: PIN_LOCKOUT_STATE_VERSION,
		failedAttempts,
		lockoutLevel,
		lockoutUntil,
		updatedAt: now,
	};

	await setPinLockoutState(nextState);
	return getPinLockoutStatus(now);
}

export async function resetPinLockout(now = Date.now()): Promise<void> {
	await setPinLockoutState(createEmptyPinLockoutState(now));
	await del(LEGACY_FAILED_ATTEMPTS_KEY);
}
