import type { ReactNode } from 'react';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { onlineManager } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { useSecurity } from '@/entities/security';
import { secureQueryPersister } from '@/shared/lib/secure-storage';

import { queryClient } from './query-client';

type StoreProviderProps = {
	children: ReactNode;
};

onlineManager.setOnline(navigator.onLine);

const persister = createAsyncStoragePersister({
	storage: secureQueryPersister,
});

export function QueryProvider({ children }: StoreProviderProps) {
	const { isLocked } = useSecurity();

	return (
		<PersistQueryClientProvider
			key={isLocked ? 'locked' : 'unlocked'}
			client={queryClient}
			persistOptions={{
				persister,
				maxAge: 1000 * 60 * 60 * 24 * 7,
			}}
		>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</PersistQueryClientProvider>
	);
}
