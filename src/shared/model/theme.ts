import type { MantineGradient } from '@mantine/core';

import { Card, createTheme } from '@mantine/core';

import cls from './theme.module.css';

export const brandGradient: MantineGradient = { from: '#ffb752', to: '#e09530', deg: 135 };

export const theme = createTheme({
	primaryColor: 'brand',
	colors: {
		brand: [
			'#fff8e1',
			'#ffecb3',
			'#ffe082',
			'#ffd54f',
			'#F4B349',
			'#ffb752',
			'#ffa726',
			'#ff9800',
			'#e09530',
			'#c68400',
		],
		dark: [
			'#ffffff',
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
		TextInput: {
			defaultProps: {
				withAsterisk: true,
			},
		},
		PasswordInput: {
			defaultProps: {
				withAsterisk: true,
			},
		},
		Button: {
			defaultProps: {
				variant: 'filled',
			},
		},
		Card: Card.extend({
			classNames: {
				root: cls.card,
			},
		}),

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
