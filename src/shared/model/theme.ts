import type { ThemeOptions } from '@mui/material/styles';

import { alpha, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
	cssVariables: {
		cssVarPrefix: '',
		colorSchemeSelector: 'class',
	},

	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#fff',
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
			variants: [
				{
					props: { variant: 'glass' },
					style: ({ theme }) => [
						{
							background: alpha(theme.palette.common.black, 0.01),

							backdropFilter: 'blur(6px)',
							border: `1px solid ${alpha(theme.palette.common.black, 0.08)}`,

							boxShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.04)}`,

							'&:hover': {
								background: alpha(theme.palette.common.black, 0.06),
								boxShadow: `0 6px 14px ${alpha(theme.palette.common.black, 0.06)}`,
							},

							'&.Mui-disabled': {
								borderColor: alpha(theme.palette.common.black, 0.03),
							},
						},

						theme.applyStyles('dark', {
							background: alpha(theme.palette.common.white, 0.03),
							border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,

							boxShadow: `0 1px 2px ${alpha(theme.palette.common.white, 0.04)}`,

							'&:hover': {
								background: alpha(theme.palette.common.white, 0.1),
								boxShadow: `0 6px 14px ${alpha(theme.palette.common.white, 0.02)}`,
							},

							'&.Mui-disabled': {
								borderColor: alpha(theme.palette.common.white, 0.03),
							},
						}),
					],
				},
			],
		},
		MuiToolbar: {
			defaultProps: {
				sx: {
					backgroundColor: 'inherit',
				},
			},
		},
	},
};

export const theme = createTheme(themeOptions);
