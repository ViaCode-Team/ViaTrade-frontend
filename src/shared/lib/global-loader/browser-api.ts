import type {
	GlobalLoaderApi,
	GlobalLoaderToken,
} from './types';

declare global {
	// eslint-disable-next-line ts/consistent-type-definitions
	interface Window {
		__VT_LOADER__?: GlobalLoaderApi;
		__VT_BOOT_LOADER_TOKEN__?: GlobalLoaderToken;
	}
}

export function getGlobalLoaderApi(): GlobalLoaderApi | null {
	if (typeof window === 'undefined')
		return null;

	return window.__VT_LOADER__ ?? null;
}

export function getBootLoaderToken(): GlobalLoaderToken | undefined {
	if (typeof window === 'undefined')
		return undefined;

	return window.__VT_BOOT_LOADER_TOKEN__;
}

export function clearBootLoaderToken() {
	if (typeof window === 'undefined')
		return;

	window.__VT_BOOT_LOADER_TOKEN__ = undefined;
}
