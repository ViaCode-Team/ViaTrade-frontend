import type { ProblemDetails } from '..';

import { ApiError } from './custom-instance-fetch';

export async function parseBody<T = unknown>(response: Response | Request): Promise<T | string | Blob | URLSearchParams | FormData | null> {
	if (response.bodyUsed) {
		throw new Error('Response body has already been read');
	}

	if (response instanceof Response && [204, 205, 304].includes(response.status)) {
		return null;
	}

	const contentLength = response.headers.get('content-length');
	if (contentLength === '0')
		return null;

	const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

	if (contentType.includes('json')) {
		return response.json();
	}

	if (contentType.includes('text/') || contentType.includes('application/xml')) {
		return response.text();
	}

	if (contentType.includes('multipart/form-data')) {
		return response.formData();
	}

	if (contentType === 'application/x-www-form-urlencoded') {
		const text = await response.text();
		return new URLSearchParams(text);
	}

	if (
		contentType.startsWith('image/')
		|| contentType.startsWith('audio/')
		|| contentType.startsWith('video/')
		|| contentType.includes('application/pdf')
		|| contentType.includes('application/octet-stream')
		|| contentType.includes('application/zip')
		|| contentType.includes('application/vnd.')
	) {
		return response.blob();
	}

	return response.text();
}

export async function createApiError(response: Response): Promise<ApiError<ProblemDetails>> {
	let errorBody: ProblemDetails | undefined;

	if (response.body) {
		try {
			const parsed = await parseBody<ProblemDetails>(response.clone());

			if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
				errorBody = parsed as ProblemDetails;
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	if (errorBody) {
		return new ApiError(errorBody);
	}

	const details: ProblemDetails = {
		type: `https://httpstatuses.com/${response.status}`,
		title: response.statusText,
		status: response.status,
		detail: 'Custom HTTP Error',
	};

	return new ApiError(details);
}
