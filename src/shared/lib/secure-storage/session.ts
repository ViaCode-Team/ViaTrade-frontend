import type { QueryClient } from '@tanstack/react-query';

import { del, get, set } from 'idb-keyval';

import {
	LAST_UNLOCK_AT_KEY,
	LOCAL_AUTH_BLOCKED_KEY,
	PIN_UNLOCK_TTL_MS,
	SECURITY_SESSION_CHANNEL,
	SESSION_MASTER_KEY_KEY,
	UNLOCK_DEADLINE_AT_KEY,
} from './constants';
import { getSessionMasterKey, setSessionMasterKey } from './state';

export type SecuritySessionEvent = {
	type: 'locked' | 'unlock-deadline-updated';
	createdAt: number;
};

type LockAppSessionOptions = {
	broadcast?: boolean;
};

function isBroadcastChannelSupported(): boolean {
	return typeof window !== 'undefined' && 'BroadcastChannel' in window;
}

function postSecuritySessionEvent(type: SecuritySessionEvent['type']): void {
	if (!isBroadcastChannelSupported())
		return;

	const channel = new BroadcastChannel(SECURITY_SESSION_CHANNEL);
	channel.postMessage({ type, createdAt: Date.now() } satisfies SecuritySessionEvent);
	channel.close();
}

function isSecuritySessionEvent(value: unknown): value is SecuritySessionEvent {
	if (!value || typeof value !== 'object')
		return false;

	const event = value as Partial<SecuritySessionEvent>;

	return (event.type === 'locked' || event.type === 'unlock-deadline-updated')
		&& typeof event.createdAt === 'number';
}

export function subscribeToSecuritySessionEvents(
	handler: (event: SecuritySessionEvent) => void,
): () => void {
	if (!isBroadcastChannelSupported())
		return () => {};

	const channel = new BroadcastChannel(SECURITY_SESSION_CHANNEL);

	channel.addEventListener('message', (event: MessageEvent<unknown>) => {
		if (isSecuritySessionEvent(event.data)) {
			handler(event.data);
		}
	});

	return () => channel.close();
}

export function isAppLocked(): boolean {
	return getSessionMasterKey() === null;
}

function isRestorableSessionKey(value: unknown): value is CryptoKey {
	if (!value || typeof value !== 'object')
		return false;

	const key = value as Partial<CryptoKey>;

	return key.type === 'secret'
		&& key.algorithm?.name === 'AES-GCM'
		&& Array.isArray(key.usages)
		&& key.usages.includes('encrypt')
		&& key.usages.includes('decrypt');
}

export function lockApp(): void {
	setSessionMasterKey(null);
}

export async function persistSessionMasterKey(key: CryptoKey): Promise<void> {
	await set(SESSION_MASTER_KEY_KEY, key);
}

export async function clearPersistedSessionMasterKey(): Promise<void> {
	await del(SESSION_MASTER_KEY_KEY);
}

export async function tryRestoreSessionMasterKey(now = Date.now()): Promise<boolean> {
	const deadlineAt = await getUnlockDeadlineAt();

	if (deadlineAt === null || now >= deadlineAt) {
		await clearPersistedSessionMasterKey();
		lockApp();
		return false;
	}

	const key = await get<unknown>(SESSION_MASTER_KEY_KEY);
	if (!isRestorableSessionKey(key)) {
		await clearPersistedSessionMasterKey();
		lockApp();
		return false;
	}

	setSessionMasterKey(key);
	return true;
}

export async function lockAppSession(
	queryClient: QueryClient,
	{ broadcast = true }: LockAppSessionOptions = {},
): Promise<void> {
	await queryClient.cancelQueries();
	lockApp();
	await clearPersistedSessionMasterKey();
	queryClient.clear();

	if (broadcast) {
		postSecuritySessionEvent('locked');
	}
}

export async function recordSuccessfulUnlock(now = Date.now()): Promise<void> {
	await set(LAST_UNLOCK_AT_KEY, now);
	await set(UNLOCK_DEADLINE_AT_KEY, now + PIN_UNLOCK_TTL_MS);
	postSecuritySessionEvent('unlock-deadline-updated');
}

export async function getLastUnlockAt(): Promise<number | null> {
	return (await get<number>(LAST_UNLOCK_AT_KEY)) ?? null;
}

export async function getUnlockDeadlineAt(): Promise<number | null> {
	return (await get<number>(UNLOCK_DEADLINE_AT_KEY)) ?? null;
}

export async function isUnlockDeadlineExpired(now = Date.now()): Promise<boolean> {
	const deadlineAt = await getUnlockDeadlineAt();

	return deadlineAt !== null && now >= deadlineAt;
}

export async function setLocalAuthBlocked(): Promise<void> {
	lockApp();
	await clearPersistedSessionMasterKey();
	await set(LOCAL_AUTH_BLOCKED_KEY, true);
}

export async function clearLocalAuthBlocked(): Promise<void> {
	await del(LOCAL_AUTH_BLOCKED_KEY);
}

export async function isLocalAuthBlocked(): Promise<boolean> {
	return (await get<boolean>(LOCAL_AUTH_BLOCKED_KEY)) === true;
}
