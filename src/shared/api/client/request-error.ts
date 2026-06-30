import { onlineManager } from '@tanstack/react-query';
import { isNetworkError } from 'ky';

import { showNoNetworkNotification } from '@/shared/lib/no-network';

import type { ApiClientOptions } from './types';

import { ApiError, createClientApiError, createNetworkApiError } from './errors';

export function normalizeRequestError(
	error: unknown,
	options?: ApiClientOptions,
): ApiError<unknown> {
	if (error instanceof ApiError) {
		return error;
	}

	if (isNetworkError(error)) {
		onlineManager.setOnline(false);
		notifyNetworkError(options);

		return createNetworkApiError(error);
	}

	return createClientApiError(error);
}

function notifyNetworkError(options?: ApiClientOptions): void {
	if (getRequestMethod(options) !== 'GET') {
		showNoNetworkNotification();
	}
}

function getRequestMethod(options?: ApiClientOptions) {
	return options?.method?.toUpperCase() ?? 'GET';
}
