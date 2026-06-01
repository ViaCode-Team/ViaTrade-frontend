import { del, get, set } from 'idb-keyval';

import { decryptText, encryptText, generateIv } from '../crypto';
import { isAppLocked } from './session';
import { getSessionMasterKey } from './state';

export async function secureSetItem(key: string, value: string): Promise<void> {
	const sessionMasterKey = getSessionMasterKey();
	if (!sessionMasterKey) {
		throw new Error('Cannot write to secure storage. App is locked.');
	}
	const iv = generateIv();
	const ciphertext = await encryptText(value, sessionMasterKey, iv);
	await set(key, { iv, ciphertext });
}

export async function secureGetItem(key: string): Promise<string | null> {
	const sessionMasterKey = getSessionMasterKey();
	if (!sessionMasterKey) {
		// App is locked, we can't read data.
		return null;
	}
	const data = await get<{ iv: Uint8Array; ciphertext: Uint8Array }>(key);
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
	await del(key);
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
