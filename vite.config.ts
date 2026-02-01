import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
// import { VitePWA } from 'vite-plugin-pwa';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
		// VitePWA(),
		analyzer(),
	],

	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});
