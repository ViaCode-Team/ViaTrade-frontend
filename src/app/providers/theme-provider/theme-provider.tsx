import type { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

import { theme } from './theme';

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<MantineProvider theme={theme} deduplicateInlineStyles defaultColorScheme='auto'>
			<Notifications />
			{children}
		</MantineProvider>
	);
}
