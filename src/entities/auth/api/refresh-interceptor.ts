import { apiClient, setApiRequestGate, setUnauthorizedHandler } from '@/shared/api';
import { hasPinSetup, isAppLocked } from '@/shared/lib/secure-storage';

import {
	getLoginUrl,
	getLogoutAllUrl,
	getLogoutUrl,
	getRefreshUrl,
	getRegisterUrl,
} from './gen';

const AUTH_ENTRY_URLS = [getRegisterUrl(), getLoginUrl()];
const AUTH_EXIT_URLS = [getLogoutUrl(), getLogoutAllUrl()];
const AUTH_REFRESH_URLS = [getRefreshUrl()];
const AUTH_URLS = [...AUTH_ENTRY_URLS, ...AUTH_EXIT_URLS, ...AUTH_REFRESH_URLS];

function matchesAnyUrl(url: string, paths: string[]) {
	return paths.some((path) => url.includes(path));
}

function isAuthRequest(url: string) {
	return AUTH_URLS.some((path) => url.includes(path));
}

function isAuthEntryRequest(url: string) {
	return matchesAnyUrl(url, AUTH_ENTRY_URLS);
}

async function isPinLocked(): Promise<boolean> {
	return await hasPinSetup() && isAppLocked();
}

async function refreshToken(): Promise<void> {
	await apiClient.post(getRefreshUrl());
}

let refreshPromise: Promise<void> | null = null;
let isRegistered = false;

export function registerAuthRefreshInterceptor() {
	if (isRegistered)
		return;

	setApiRequestGate(async (request) => {
		if (isAuthEntryRequest(request.url))
			return true;

		if (matchesAnyUrl(request.url, AUTH_EXIT_URLS))
			return true;

		return !(await isPinLocked());
	});

	setUnauthorizedHandler(async (request) => {
		if (isAuthRequest(request.url)) {
			return false;
		}

		if (await isPinLocked()) {
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
