/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, use } from 'react';

import { useRemindList } from '../lib/use-remind-list';

type RemindContextValue = ReturnType<typeof useRemindList>;

const RemindContext = createContext<RemindContextValue | null>(null);

export function RemindProvider({ children }: { children: ReactNode }) {
	const value = useRemindList({
		defaultReminds: [],
		isLoading: false,
	});

	return (
		<RemindContext value={value}>
			{children}
		</RemindContext>
	);
}

export function useRemindContext() {
	const context = use(RemindContext);

	if (!context) {
		throw new Error('useRemindContext must be used within RemindProvider');
	}

	return context;
}
