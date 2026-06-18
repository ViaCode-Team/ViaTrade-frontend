import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchInterval: false,
			refetchOnReconnect: false,
			refetchIntervalInBackground: false,
			gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days cache
			staleTime: 1000 * 60 * 5, // 5 minutes
			networkMode: 'offlineFirst',
		},
		mutations: {
			networkMode: 'offlineFirst',
		},
	},
});
