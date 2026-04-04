import type { ReactNode } from 'react';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { theme } from '@/shared/model/theme';

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<MantineProvider theme={theme} defaultColorScheme='auto'>
			{children}
		</MantineProvider>
	);
}

export { ColorSchemeScript };
