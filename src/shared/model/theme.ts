'use client';
import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
	palette: {
		primary: {
			main: '#ffffff',
		},
		secondary: {
			main: '#ffb752',
		},
	},
};

export const theme = createTheme({});
