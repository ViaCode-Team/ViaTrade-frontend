import { apiClient } from '@/shared/api';

import { getLogoutUrl } from './gen';

function canRequestLogout() {
	return typeof navigator !== 'undefined' && navigator.onLine;
}

export async function logoutCurrentSessionSilently(): Promise<boolean> {
	if (!canRequestLogout())
		return false;

	try {
		await apiClient.post(getLogoutUrl());
		return true;
	}
	catch {
		// Integrity blocking must not depend on server logout availability.
		return false;
	}
}
