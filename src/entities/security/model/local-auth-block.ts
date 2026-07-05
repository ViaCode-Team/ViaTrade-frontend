import type { QueryClient } from '@tanstack/react-query';

import { clearLocalData } from '@/shared/lib/auth';
import { clearLocalAuthBlocked, setLocalAuthBlocked } from '@/shared/lib/secure-storage';

export async function blockLocalAuth(queryClient: QueryClient) {
	await clearLocalData(queryClient);
	await setLocalAuthBlocked();
}

export async function clearLocalAuthBlock(queryClient: QueryClient) {
	await clearLocalData(queryClient);
	await clearLocalAuthBlocked();
}
