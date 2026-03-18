import { createApiError, interceptors } from '@/shared/api';
import { buildApiUrl } from '@/shared/lib/config';

import { getLoginUrl, getRefreshUrl, getRegisterUrl } from './gen';

const AUTH_URLS = [getRegisterUrl(), getLoginUrl()];

function isAuthRequest(url: string) {
	return AUTH_URLS.some((path) => url.includes(path));
}

async function refreshToken(): Promise<void> {
	const responseRefresh = await fetch(
		buildApiUrl(getRefreshUrl()),
		{ method: 'POST' },
	);

	if (!responseRefresh.ok) {
		throw await createApiError(responseRefresh);
	}
}

let refreshPromise: Promise<void> | null = null;

interceptors.response.use(async (response, url, options): Promise<Response> => {
	if (response.status !== 401 || isAuthRequest(url))
		return response;

	// Deduplicate refresh requests
	refreshPromise ??= refreshToken()
		.finally(() => {
			refreshPromise = null;
		});

	await refreshPromise;

	// Retry
	return fetch(url, options);
});
