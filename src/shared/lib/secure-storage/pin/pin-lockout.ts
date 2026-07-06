import { del, get, set } from 'idb-keyval';

import {
	LEGACY_FAILED_ATTEMPTS_KEY,
	PIN_LOCKOUT_DURATIONS_MS,
	PIN_LOCKOUT_FAILURE_THRESHOLD,
	PIN_LOCKOUT_STATE_KEY,
} from '../constants';

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

function getLockoutRemainingMs(state: PinLockoutState, now = Date.now()): number {
	if (state.lockoutUntil === null)
		return 0;

	return Math.max(state.lockoutUntil - now, 0);
}

function getNextLockoutLevel(state: PinLockoutState, shouldLockout: boolean): number {
	if (!shouldLockout)
		return state.lockoutLevel;

	return Math.min(state.lockoutLevel + 1, PIN_LOCKOUT_DURATIONS_MS.length);
}

function getLockoutUntil(lockoutLevel: number, shouldLockout: boolean, now = Date.now()): number | null {
	if (!shouldLockout)
		return null;

	const lockoutDurationMs = PIN_LOCKOUT_DURATIONS_MS[lockoutLevel - 1] ?? 0;
	return now + lockoutDurationMs;
}

async function getStoredPinLockoutState(now = Date.now()): Promise<PinLockoutState> {
	const state = await get<unknown>(PIN_LOCKOUT_STATE_KEY);

	if (!isPinLockoutState(state))
		return createEmptyPinLockoutState(now);

	if (getLockoutRemainingMs(state, now) > 0)
		return state;

	if (state.lockoutUntil === null)
		return state;

	const normalizedState = {
		...state,
		lockoutUntil: null,
		updatedAt: now,
	};

	await setPinLockoutState(normalizedState);
	return normalizedState;
}

async function setPinLockoutState(state: PinLockoutState): Promise<void> {
	await set(PIN_LOCKOUT_STATE_KEY, state);
}

export async function getPinLockoutStatus(now = Date.now()): Promise<PinLockoutStatus> {
	const state = await getStoredPinLockoutState(now);
	const remainingMs = getLockoutRemainingMs(state, now);

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
	const lockoutLevel = getNextLockoutLevel(currentState, shouldLockout);

	await setPinLockoutState({
		version: PIN_LOCKOUT_STATE_VERSION,
		failedAttempts,
		lockoutLevel,
		lockoutUntil: getLockoutUntil(lockoutLevel, shouldLockout, now),
		updatedAt: now,
	});

	return getPinLockoutStatus(now);
}

export async function resetPinLockout(now = Date.now()): Promise<void> {
	await setPinLockoutState(createEmptyPinLockoutState(now));
	await del(LEGACY_FAILED_ATTEMPTS_KEY);
}
