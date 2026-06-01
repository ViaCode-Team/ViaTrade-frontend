import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { VitePWA } from 'vite-plugin-pwa';
// import svgr from 'vite-plugin-svgr';

import { analyzerConfig } from './config/vite/analyzer';
import { proxyConfig } from './config/vite/proxy';
import { pwaConfig } from './config/vite/pwa';
// import { svgrConfig } from './config/vite/svgr';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		babel({
			presets: [reactCompilerPreset()],
		}),
		VitePWA(pwaConfig),
		// svgr(svgrConfig),
		analyzer(analyzerConfig),
	],

	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},

	server: {
		proxy: proxyConfig,
	},

	preview: {
		proxy: proxyConfig,
	},
});
