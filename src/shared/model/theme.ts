import type { ThemeOptions } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
	cssVariables: {
		cssVarPrefix: '',
		colorSchemeSelector: 'class',
	},

	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#000',
				},
				secondary: {
					main: '#ffb752',
				},
			},
		},
		dark: {
			palette: {
				primary: {
					main: '#fff',
				},
				secondary: {
					main: '#ffb752',
				},
			},
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
		},
	},
};

export const theme = createTheme(themeOptions);
