import { del, get, set } from 'idb-keyval';

import { PIN_SETUP_MARK_KEY } from '../constants';

export async function setPinSetupMark(): Promise<void> {
	const mark = crypto.randomUUID();
	await set(PIN_SETUP_MARK_KEY, mark);
}

export async function clearPinSetupMark(): Promise<void> {
	await del(PIN_SETUP_MARK_KEY);
}

export async function hasPinSetupMark(): Promise<boolean> {
	const mark = await get<string>(PIN_SETUP_MARK_KEY);
	return !!mark;
}
