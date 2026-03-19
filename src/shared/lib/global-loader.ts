/* eslint-disable ts/consistent-type-definitions */
export type GlobalLoaderToken = symbol;

type AcquireOptions = {
	delayMs?: number;
};

type GlobalLoaderApi = {
	acquire: (options?: AcquireOptions) => GlobalLoaderToken;
	release: (token: GlobalLoaderToken) => void;
};

declare global {
	interface Window {
		__VT_LOADER__?: GlobalLoaderApi;
		__VT_BOOT_LOADER_TOKEN__?: GlobalLoaderToken;
	}
}

function getGlobalLoaderApi(): GlobalLoaderApi | null {
	if (typeof window === 'undefined')
		return null;

	return window.__VT_LOADER__ ?? null;
}

export function acquireGlobalLoader(options?: AcquireOptions): GlobalLoaderToken | null {
	return getGlobalLoaderApi()?.acquire(options) ?? null;
}

export function releaseGlobalLoader(token: GlobalLoaderToken | null | undefined) {
	if (!token)
		return;

	getGlobalLoaderApi()?.release(token);
}

export function releaseBootLoader() {
	if (typeof window === 'undefined')
		return;

	const token = window.__VT_BOOT_LOADER_TOKEN__;
	if (!token)
		return;

	window.__VT_LOADER__?.release(token);
	window.__VT_BOOT_LOADER_TOKEN__ = undefined;
}
