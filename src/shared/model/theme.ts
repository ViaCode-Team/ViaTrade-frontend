import type { MantineGradient } from '@mantine/core';

import { createTheme } from '@mantine/core';

export const brandGradient: MantineGradient = { from: '#ffb752', to: '#e09530', deg: 135 };

export const theme = createTheme({
	primaryColor: 'dark',
	colors: {
		brand: [
			'#fff8e1',
			'#ffecb3',
			'#ffe082',
			'#ffd54f',
			'#ffca28',
			'#ffb752',
			'#ffa726',
			'#ff9800',
			'#e09530',
			'#c68400',
		],
		dark: [
			'#d5d7da',
			'#acaeb2',
			'#8b8d91',
			'#5c5f66',
			'#3a3a3a',
			'#2a2a2a',
			'#1e1e1e',
			'#121212',
			'#0e0e0e',
			'#080808',
		],
	},
	defaultRadius: 'md',
	fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
	fontFamilyMonospace: '"JetBrains Mono", ui-monospace, monospace',
	headings: {
		fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
	},
	components: {
		Button: {
			defaultProps: {
				variant: 'filled',
			},
		},
		Loader: {
			defaultProps: {
				c: 'brand.5',
			},
			styles: {
				root: {
					display: 'flex',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				},
			},
		},
	},
});
