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
	FAILED_ATTEMPTS_KEY,
	PIN_SETUP_MARK_KEY,
	STORE_ENCRYPTED_MK_KEY,
	STORE_MK_IV_KEY,
	STORE_SALT_KEY,
} from './constants';
import { saveTempKey } from './cookie';
import { setSessionMasterKey } from './state';

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

	const mk = await generateMasterKey();
	const rawMk = await exportKey(mk);

	const iv = generateIv();
	const encryptedMk = await encryptBuffer(rawMk, kek, iv);

	await set(STORE_SALT_KEY, salt);
	await set(STORE_ENCRYPTED_MK_KEY, encryptedMk);
	await set(STORE_MK_IV_KEY, iv);
	await set(FAILED_ATTEMPTS_KEY, 0);

	setSessionMasterKey(mk);
	saveTempKey(rawMk);
}

export async function unlockApp(pin: string): Promise<boolean> {
	try {
		const salt = await get<Uint8Array>(STORE_SALT_KEY);
		const encryptedMk = await get<Uint8Array>(STORE_ENCRYPTED_MK_KEY);
		const iv = await get<Uint8Array>(STORE_MK_IV_KEY);

		if (!salt || !encryptedMk || !iv) {
			throw new Error('PIN is not set up properly.');
		}

		const kek = await deriveKeyFromPin(pin, salt);
		const rawMk = await decryptBuffer(encryptedMk, kek, iv);

		const mk = await importKey(rawMk);
		setSessionMasterKey(mk);
		saveTempKey(rawMk);
		return true;
	}
	catch (e) {
		console.error('Failed to unlock app', e);
		return false;
	}
}
