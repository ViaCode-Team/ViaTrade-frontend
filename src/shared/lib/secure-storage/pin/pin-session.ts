import { get, set } from 'idb-keyval';

import {
	decryptBuffer,
	deriveKeyFromPin,
	encryptBuffer,
	exportKey,
	generateIv,
	generateMasterKey,
	generateSalt,
	importKey,
} from '../../crypto';
import {
	STORE_ENCRYPTED_MK_KEY,
	STORE_MK_IV_KEY,
	STORE_SALT_KEY,
} from '../constants';
import { persistSessionMasterKey, recordSuccessfulUnlock } from '../session';
import { setSessionMasterKey } from '../state';
import { resetPinLockout } from './pin-lockout';

export async function hasPinSetup(): Promise<boolean> {
	const salt = await get<Uint8Array>(STORE_SALT_KEY);
	const encryptedMasterKey = await get<Uint8Array>(STORE_ENCRYPTED_MK_KEY);

	return !!(salt && encryptedMasterKey);
}

export async function setupPin(pin: string): Promise<void> {
	const salt = generateSalt();
	const pinKey = await deriveKeyFromPin(pin, salt);
	const masterKey = await generateMasterKey();
	const rawMasterKey = await exportKey(masterKey);
	const masterKeyIv = generateIv();
	const encryptedMasterKey = await encryptBuffer(rawMasterKey, pinKey, masterKeyIv);
	const sessionMasterKey = await importKey(rawMasterKey);

	await savePinSession({
		encryptedMasterKey,
		masterKeyIv,
		salt,
	});
	await resetPinLockout();
	await activatePinSession(sessionMasterKey);
}

export async function unlockApp(pin: string): Promise<boolean> {
	try {
		const pinSession = await readPinSession();
		const pinKey = await deriveKeyFromPin(pin, pinSession.salt);
		const rawMasterKey = await decryptBuffer(
			pinSession.encryptedMasterKey,
			pinKey,
			pinSession.masterKeyIv,
		);
		const sessionMasterKey = await importKey(rawMasterKey);

		await resetPinLockout();
		await activatePinSession(sessionMasterKey);
		return true;
	}
	catch (error) {
		console.error('Failed to unlock app', error);
		return false;
	}
}

type StoredPinSession = {
	encryptedMasterKey: Uint8Array;
	masterKeyIv: Uint8Array;
	salt: Uint8Array;
};

async function savePinSession({
	encryptedMasterKey,
	masterKeyIv,
	salt,
}: StoredPinSession): Promise<void> {
	await set(STORE_SALT_KEY, salt);
	await set(STORE_ENCRYPTED_MK_KEY, encryptedMasterKey);
	await set(STORE_MK_IV_KEY, masterKeyIv);
}

async function readPinSession(): Promise<StoredPinSession> {
	const salt = await get<Uint8Array>(STORE_SALT_KEY);
	const encryptedMasterKey = await get<Uint8Array>(STORE_ENCRYPTED_MK_KEY);
	const masterKeyIv = await get<Uint8Array>(STORE_MK_IV_KEY);

	if (!salt || !encryptedMasterKey || !masterKeyIv) {
		throw new Error('PIN is not set up properly.');
	}

	return {
		encryptedMasterKey,
		masterKeyIv,
		salt,
	};
}

async function activatePinSession(sessionMasterKey: CryptoKey): Promise<void> {
	setSessionMasterKey(sessionMasterKey);
	await persistSessionMasterKey(sessionMasterKey);
	await recordSuccessfulUnlock();
}
