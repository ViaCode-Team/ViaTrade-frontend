import { QueryClient } from '@tanstack/react-query';

import { milliseconds } from '@/shared/lib/milliseconds';
import {
	QUERY_CACHE_MAX_AGE,
} from '@/shared/model';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchInterval: false,
			refetchOnReconnect: true,
			gcTime: QUERY_CACHE_MAX_AGE,
			staleTime: milliseconds.fromMinutes(5),
			networkMode: 'offlineFirst',
		},
		mutations: {
			networkMode: 'offlineFirst',
		},
	},
});
