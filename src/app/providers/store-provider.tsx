import type { ReactNode } from 'react';

import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/app/store';

type StoreProviderProps = {
	children: ReactNode;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
	return <ReduxProvider store={store}>{children}</ReduxProvider>;
};
