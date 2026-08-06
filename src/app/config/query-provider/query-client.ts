import { QueryClient } from '@tanstack/react-query';

import {
	QUERY_PERSIST_MAX_AGE,
	QUERY_REFETCH_INTERVAL,
	QUERY_STALE_TIME,
} from '@/shared/model';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			networkMode: 'offlineFirst',
			gcTime: QUERY_PERSIST_MAX_AGE,
			staleTime: QUERY_STALE_TIME,
			refetchOnReconnect: 'always',
			refetchOnWindowFocus: true,
			refetchInterval: QUERY_REFETCH_INTERVAL,
		},
		mutations: {
			networkMode: 'offlineFirst',
		},
	},
});
