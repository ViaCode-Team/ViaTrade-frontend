import type {
	AcquireOptions,
	GlobalLoaderToken,
} from './types';

import {
	clearBootLoaderToken,
	getBootLoaderToken,
	getGlobalLoaderApi,
} from './browser-api';

export type { GlobalLoaderToken } from './types';

export function acquireGlobalLoader(options?: AcquireOptions): GlobalLoaderToken | null {
	return getGlobalLoaderApi()?.acquire(options) ?? null;
}

export function releaseGlobalLoader(token: GlobalLoaderToken | null | undefined) {
	if (!token)
		return;

	getGlobalLoaderApi()?.release(token);
}

export function releaseBootLoader() {
	const token = getBootLoaderToken();
	if (!token)
		return;

	getGlobalLoaderApi()?.release(token);
	clearBootLoaderToken();
}
