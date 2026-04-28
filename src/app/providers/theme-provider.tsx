import type { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';

import { theme } from '@/shared/model/theme';

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<MantineProvider theme={theme} deduplicateInlineStyles defaultColorScheme='auto'>
			<ModalsProvider>
				{children}
			</ModalsProvider>
		</MantineProvider>
	);
}
