import Cookies from 'js-cookie';

import { milliseconds } from '../milliseconds';
import {
	LOCKOUT_MINUTES,
	TEMP_MK_COOKIE,
} from './constants';

export function toHex(bytes: Uint8Array): string {
	return Array.from(bytes, (byte) =>
		byte.toString(16).padStart(2, '0')).join('');
}

export function fromHex(hex: string): Uint8Array {
	const bytes = new Uint8Array(hex.length / 2);

	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
	}

	return bytes;
}

function getCookieOptions(): Cookies.CookieAttributes {
	return {
		path: '/',
		sameSite: 'lax',
		secure:
			typeof window !== 'undefined'
			&& window.location.protocol === 'https:',
	};
}

function getLockoutExpirationDate(): Date {
	return new Date(Date.now() + milliseconds.fromMinutes(LOCKOUT_MINUTES));
}

export function getTempKey(): string | null {
	return Cookies.get(TEMP_MK_COOKIE) ?? null;
}

export function checkCookieLockState(): boolean {
	return Boolean(Cookies.get(TEMP_MK_COOKIE));
}

export function saveTempKey(rawMk: Uint8Array): void {
	Cookies.set(TEMP_MK_COOKIE, toHex(rawMk), {
		...getCookieOptions(),
		expires: getLockoutExpirationDate(),
	});
}

export function clearTempKey(): void {
	Cookies.remove(TEMP_MK_COOKIE, getCookieOptions());
}
