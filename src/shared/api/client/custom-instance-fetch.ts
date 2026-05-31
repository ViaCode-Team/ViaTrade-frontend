import { notifications } from '@mantine/notifications';
import { IconWifiOff } from '@tabler/icons-react';
import { onlineManager } from '@tanstack/react-query';
import React from 'react';

import { buildApiUrl } from '@/shared/lib/config';

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
				notifications.show({
					title: 'Нет сети',
					message: 'Это действие недоступно в автономном режиме',
					color: 'yellow',
					icon: React.createElement(IconWifiOff, { size: 18 }),
				});
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
