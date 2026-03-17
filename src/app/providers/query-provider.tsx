import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '../query-client';

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
