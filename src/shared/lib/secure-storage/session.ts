import { importKey } from '../crypto';
import { clearTempKey, fromHex, getTempKey, saveTempKey } from './cookie';
import { getSessionMasterKey, setSessionMasterKey } from './state';

export function isAppLocked(): boolean {
	return getSessionMasterKey() === null;
}

export function lockApp(): void {
	setSessionMasterKey(null);
	clearTempKey();
}

export async function tryRestoreSessionKey(): Promise<boolean> {
	const tempKeyHex = getTempKey();

	if (tempKeyHex && tempKeyHex.length > 0) {
		try {
			const rawMk = fromHex(tempKeyHex);
			const key = await importKey(rawMk);
			setSessionMasterKey(key);
			saveTempKey(rawMk); // Refresh the timeout
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
