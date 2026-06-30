import type { HTTPError } from 'ky';

import type { ProblemDetails } from '../types/gen';

export const NETWORK_ERROR_DETAILS: ProblemDetails = {
	type: 'urn:viatrade:network-error',
	title: 'Network Error',
	status: 0,
	detail: 'Network request failed',
};

const CLIENT_ERROR_DETAILS: ProblemDetails = {
	type: 'urn:viatrade:client-error',
	title: 'Client Error',
	status: 0,
	detail: 'Unexpected client error',
};

export function getHttpProblemDetails(error: HTTPError<unknown>): ProblemDetails {
	if (isProblemDetails(error.data)) {
		return error.data;
	}

	const status = error.response.status;
	const title = error.response.statusText || `HTTP ${status}`;

	return {
		type: `https://httpstatuses.com/${status}`,
		title,
		status,
		detail: getHttpErrorDetail(error) ?? 'HTTP error',
	};
}

export function getClientProblemDetails(error: unknown): ProblemDetails {
	return {
		...CLIENT_ERROR_DETAILS,
		detail: getUnknownErrorMessage(error) ?? CLIENT_ERROR_DETAILS.detail,
	};
}

export function isProblemDetails(value: unknown): value is ProblemDetails {
	return (
		typeof value === 'object'
		&& value !== null
		&& !Array.isArray(value)
		&& typeof (value as ProblemDetails).type === 'string'
		&& typeof (value as ProblemDetails).title === 'string'
		&& typeof (value as ProblemDetails).status === 'number'
		&& typeof (value as ProblemDetails).detail === 'string'
	);
}

function getHttpErrorDetail(error: HTTPError<unknown>): string | undefined {
	if (typeof error.data === 'string') {
		return getNonEmptyString(error.data);
	}

	if (isObjectWithMessage(error.data)) {
		return getNonEmptyString(error.data.message);
	}

	return getNonEmptyString(error.message);
}

function getUnknownErrorMessage(error: unknown): string | undefined {
	if (error instanceof Error) {
		return getNonEmptyString(error.message);
	}

	if (typeof error === 'string') {
		return getNonEmptyString(error);
	}

	return undefined;
}

function getNonEmptyString(value: string): string | undefined {
	const trimmedValue = value.trim();

	return trimmedValue || undefined;
}

function isObjectWithMessage(value: unknown): value is { message: string } {
	return (
		typeof value === 'object'
		&& value !== null
		&& 'message' in value
		&& typeof value.message === 'string'
	);
}
