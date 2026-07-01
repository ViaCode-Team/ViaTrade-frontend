import type { ReactNode } from 'react';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { onlineManager } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { useSecurity } from '@/entities/security';
import { secureQueryPersister } from '@/shared/lib/secure-storage';
import { createStorageKey } from '@/shared/lib/storage-key';
import { QUERY_CACHE_MAX_AGE } from '@/shared/model';
import { GlobalLoader } from '@/shared/ui/global-loader';

import { AppReactQueryDevtools } from './app-react-query-devtools';
import { queryClient } from './query-client';

type StoreProviderProps = {
	children: ReactNode;
};

onlineManager.setOnline(navigator.onLine);

const persister = createAsyncStoragePersister({
	key: createStorageKey('query', 'cache'),
	storage: secureQueryPersister,
});

export function QueryProvider({ children }: StoreProviderProps) {
	const { hasPin, isLocked, isLocalAuthBlocked, isReady } = useSecurity();

	if (!isReady)
		return <GlobalLoader />;

	const isSecurityLocked = isLocalAuthBlocked || (hasPin && isLocked);

	return (
		<PersistQueryClientProvider
			key={isSecurityLocked ? 'locked' : 'unlocked'}
			client={queryClient}
			persistOptions={{
				persister,
				maxAge: QUERY_CACHE_MAX_AGE,
			}}
		>
			{children}
			<AppReactQueryDevtools />
		</PersistQueryClientProvider>
	);
}
