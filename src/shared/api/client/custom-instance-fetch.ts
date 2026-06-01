import { onlineManager } from '@tanstack/react-query';

import { buildApiUrl } from '@/shared/lib/config';
import { showNoNetworkNotification } from '@/shared/lib/no-network';

import { createApiError, parseBody } from './body';
import { runRequestInterceptors, runResponseInterceptors } from './interceptor';

export type ErrorType<Error> = ApiError<Error> | NetworkError;

export async function customInstance<T>(
	url: string,
	options: RequestInit,
): Promise<T> {
	[url, options] = await runRequestInterceptors(buildApiUrl(url), options);

	let response: Response;
	try {
		response = await fetch(url, options);
		onlineManager.setOnline(true);
	}
	catch (error) {
		if (error instanceof TypeError) {
			onlineManager.setOnline(false);

			if (options.method && options.method !== 'GET') {
				showNoNetworkNotification();
			}

			throw new NetworkError('Failed to fetch due to network issues');
		}
		throw error;
	}

	response = await runResponseInterceptors(response, url, options);

	if (!response.ok) {
		throw await createApiError(response);
	}

	const body = await parseBody<T>(response);

	return {
		data: body,
		headers: response.headers,
		status: response.status,
	} as T;
}

export class ApiError<T> extends Error {
	public details: T;

	constructor(details: T) {
		super('API error');
		this.details = details;
	}
}

export class NetworkError extends Error {
	constructor(message: string = 'Network error') {
		super(message);
		this.name = 'NetworkError';
	}
}
