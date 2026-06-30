import type { Options } from 'ky';

import { onlineManager } from '@tanstack/react-query';

import type { ProblemDetails } from '../types/gen';
import type { ApiError } from './errors';
import type { ApiClientOptions, ApiResponse } from './types';

import { apiClient } from './ky-client';
import { normalizeRequestError } from './request-error';
import { parseResponseData } from './response-data';

export type ErrorType<Error> = ApiError<Error | ProblemDetails>;

export async function customInstance<T>(
	url: string,
	options?: ApiClientOptions,
): Promise<T> {
	try {
		const request = createRequest<T>(url, options);
		const response = await request;

		onlineManager.setOnline(true);
		return createApiResponse<T>(await parseResponseData(request, response), response);
	}
	catch (error) {
		throw normalizeRequestError(error, options);
	}
}

function createRequest<T>(url: string, options?: ApiClientOptions) {
	return apiClient<T>(url, options as Options | undefined);
}

function createApiResponse<T>(data: unknown, response: Response): T {
	const apiResponse = {
		data,
		headers: response.headers,
		status: response.status,
	} satisfies ApiResponse<unknown>;

	return apiResponse as T;
}
