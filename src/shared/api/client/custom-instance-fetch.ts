import { buildApiUrl } from '@/shared/lib/config';

import { handleError, parseBody } from './body';
import { runRequestInterceptors, runResponseInterceptors } from './interceptor';

export type ErrorType<Error> = ApiError<Error>;

export async function customInstance<T>(
	url: string,
	options: RequestInit,
): Promise<T> {
	[url, options] = await runRequestInterceptors(buildApiUrl(url), options);

	let response = await fetch(url, options);

	response = await runResponseInterceptors(response, url, options);

	if (!response.ok) {
		await handleError(response);
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
