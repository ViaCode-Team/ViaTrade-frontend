import { queryClient } from '@/app/config';
import { getDeleteCurrentSessionUrl } from '@/entities/session';
import { apiClient } from '@/shared/api';
import { clearLocalData } from '@/shared/lib/auth';
import { clearLocalAuthBlocked, setLocalAuthBlocked } from '@/shared/lib/secure-storage';

export type LocalAuthBlockResult = 'resolved' | 'blocked';

let localAuthBlockPromise: Promise<LocalAuthBlockResult> | null = null;

export function resolveLocalAuthBlock() {
	localAuthBlockPromise ??= runLocalAuthBlockResolution()
		.finally(() => {
			localAuthBlockPromise = null;
		});

	return localAuthBlockPromise;
}

async function runLocalAuthBlockResolution(): Promise<LocalAuthBlockResult> {
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
