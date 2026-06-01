import type { QueryClient } from '@tanstack/react-query';

import { clear } from 'idb-keyval';
import Cookies from 'js-cookie';

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
	// await Promise.all(
	// 	(await caches.keys()).map((key) => caches.delete(key)),
	// );
	Object.keys(Cookies.get()).forEach((name) => {
		Cookies.remove(name);
	});
}
