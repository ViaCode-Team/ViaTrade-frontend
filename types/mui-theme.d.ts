/* eslint-disable ts/consistent-type-definitions */
import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme {
		getColorSchemeSelector?: (colorScheme: string) => string;
	}

	interface ThemeOptions {
		getColorSchemeSelector?: (colorScheme: string) => string;
	}
}
