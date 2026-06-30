import type { HTTPError } from 'ky';

import type { ProblemDetails } from '../types/gen';

import {
	getClientProblemDetails,
	getHttpProblemDetails,
	isProblemDetails,
	NETWORK_ERROR_DETAILS,
} from './problem-details';

type ApiErrorOptions = {
	cause?: unknown;
	message?: string;
	name?: string;
};

export class ApiError<T> extends Error {
	public details: T;

	constructor(details: T, options: ApiErrorOptions = {}) {
		super(options.message ?? getApiErrorMessage(details), {
			cause: options.cause,
		});

		this.name = options.name ?? 'ApiError';
		this.details = details;
	}
}

export class NetworkError extends ApiError<ProblemDetails> {
	constructor(cause: unknown) {
		super({ ...NETWORK_ERROR_DETAILS }, {
			cause,
			name: 'NetworkError',
		});
	}
}

export function createHttpApiError(error: HTTPError<unknown>): ApiError<ProblemDetails> {
	return new ApiError(getHttpProblemDetails(error), {
		cause: error,
	});
}

export function createNetworkApiError(error: unknown): NetworkError {
	return new NetworkError(error);
}

export function createClientApiError(error: unknown): ApiError<ProblemDetails> {
	return new ApiError(getClientProblemDetails(error), {
		cause: error,
	});
}

function getApiErrorMessage(details: unknown): string {
	if (isProblemDetails(details)) {
		return details.title;
	}

	return 'API error';
}
