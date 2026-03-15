import type { ReactNode } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { IS_DEV } from '@/shared/lib/config';
import { theme } from '@/shared/model/theme';

const cache = createCache({
	key: 's',
	// Отключение плагинов postCss в дев режиме
	...(IS_DEV ? { stylisPlugins: [] } : {}),
});

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<CacheProvider value={cache}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</CacheProvider>
	);
}
