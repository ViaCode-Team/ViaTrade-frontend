import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchInterval: false,
		},
	},
});

type StoreProviderProps = {
	children: ReactNode;
};

export function QueryProvider({ children }: StoreProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools buttonPosition='bottom-left' initialIsOpen={false} />
		</QueryClientProvider>
	);
}
