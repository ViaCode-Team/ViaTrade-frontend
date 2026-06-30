import { apiClient, setUnauthorizedHandler } from '@/shared/api';

import { getLoginUrl, getRefreshUrl, getRegisterUrl } from './gen';

const AUTH_URLS = [getRegisterUrl(), getLoginUrl(), getRefreshUrl()];

function isAuthRequest(url: string) {
	return AUTH_URLS.some((path) => url.includes(path));
}

async function refreshToken(): Promise<void> {
	await apiClient.post(getRefreshUrl());
}

let refreshPromise: Promise<void> | null = null;
let isRegistered = false;

export function registerAuthRefreshInterceptor() {
	if (isRegistered)
		return;

	setUnauthorizedHandler(async (request) => {
		if (isAuthRequest(request.url)) {
			return false;
		}

		refreshPromise ??= refreshToken()
			.finally(() => {
				refreshPromise = null;
			});

		await refreshPromise;
	});

	isRegistered = true;
}
