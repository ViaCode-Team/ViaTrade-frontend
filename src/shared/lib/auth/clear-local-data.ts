import type { QueryClient } from '@tanstack/react-query';

import { clear } from 'idb-keyval';

import { lockApp } from '@/shared/lib/secure-storage';

/**
 * Clears all local application data, including:
 * - LocalStorage
 * - SessionStorage
 * - IndexedDB
 * - React Query Cache
 * - Locks the app
 */
export async function clearLocalData(queryClient: QueryClient) {
	lockApp();
	await clear();

	localStorage.clear();
	sessionStorage.clear();
	queryClient.clear();

	// Clear all cookies
	document.cookie
		.split(';')
		.forEach((cookie) => {
			const [name] = cookie.split('=');

			if (!name) {
				return;
			}

			document.cookie = `${name.trim()}=; Max-Age=0; path=/`;
		});
}
