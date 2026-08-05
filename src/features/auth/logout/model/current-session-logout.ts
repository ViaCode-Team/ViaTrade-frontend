import type { QueryClient } from '@tanstack/react-query';

import { getDeleteCurrentSessionUrl } from '@/entities/session';
import { apiClient } from '@/shared/api';
import { clearLocalData } from '@/shared/lib/auth';
import { clearLocalAuthBlocked, setLocalAuthBlocked } from '@/shared/lib/secure-storage';

export type CurrentSessionLogoutResult = 'resolved' | 'blocked';

let currentSessionLogoutPromise: Promise<CurrentSessionLogoutResult> | null = null;

export function resolveCurrentSessionLogout(queryClient: QueryClient) {
	currentSessionLogoutPromise ??= runCurrentSessionLogout(queryClient)
		.finally(() => {
			currentSessionLogoutPromise = null;
		});

	return currentSessionLogoutPromise;
}

async function runCurrentSessionLogout(queryClient: QueryClient): Promise<CurrentSessionLogoutResult> {
	const isLoggedOut = await logoutCurrentSession();

	await clearLocalData(queryClient);

	if (isLoggedOut) {
		await clearLocalAuthBlocked();
		return 'resolved';
	}

	await setLocalAuthBlocked();
	return 'blocked';
}

async function logoutCurrentSession() {
	if (!navigator.onLine)
		return false;

	try {
		await apiClient.delete(getDeleteCurrentSessionUrl());
		return true;
	}
	catch {
		return false;
	}
}
