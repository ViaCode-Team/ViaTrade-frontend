import type { ReactNode } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { IS_DEV } from '@/shared/model/mode';
import { theme } from '@/shared/model/theme';

type ThemeProviderProps = {
	children: ReactNode;
};

const cache = createCache({
	key: 's',
	...(IS_DEV ? { stylisPlugins: [] } : {}),
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	return (
		<CacheProvider value={cache}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</CacheProvider>
	);
};
