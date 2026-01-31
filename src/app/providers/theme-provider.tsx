import type { ReactNode } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
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
