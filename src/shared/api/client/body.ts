import type { ProblemDetails } from '../gen/types';

import { ApiError } from './custom-instance-fetch';

export async function parseBody<T = unknown>(response: Response | Request): Promise<T | string | Blob | URLSearchParams> {
	if (response instanceof Response && [204, 205, 304].includes(response.status)) {
		return response.text();
	}

	const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

	if (contentType.includes('json')) {
		return response.json();
	}

	if (contentType.includes('text/') || contentType.includes('application/xml')) {
		return response.text();
	}

	if (
		contentType.startsWith('image/')
		|| contentType.startsWith('audio/')
		|| contentType.startsWith('video/')
		|| contentType.includes('application/pdf')
	) {
		return response.blob();
	}

	if (contentType === 'application/x-www-form-urlencoded') {
		const text = await response.text();
		return new URLSearchParams(text);
	}

	return response.text();
}

export async function handleError(response: Response) {
	let errorBody: ProblemDetails | undefined;

	if (response.body) {
		try {
			errorBody = await response.json();
		}
		catch (e) {
			console.error(e);
		}
	}

	if (errorBody)
		throw new ApiError(errorBody);

	const details: ProblemDetails = {
		type: `https://httpstatuses.com/${response.status}`,
		title: response.statusText,
		status: response.status,
		detail: 'Custom HTTP Error',
	};

	throw new ApiError(details);
}
