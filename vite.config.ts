import babel from '@rolldown/plugin-babel';
import transformImports from '@rolldown/plugin-transform-imports';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig, type PluginOption } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { VitePWA } from 'vite-plugin-pwa';

import { analyzerConfig } from './config/vite/analyzer';
import { proxyConfig } from './config/vite/proxy';
import { pwaConfig } from './config/vite/pwa';
import { transformImportsConfig } from './config/vite/transform-imports';

export default defineConfig(({ command }) => {
	const isBuild = command === 'build';

	const plugins: PluginOption[] = [
		react(),

		babel({
			presets: [reactCompilerPreset()],
		}),

		VitePWA(pwaConfig),

		...(isBuild
			? [
					transformImports(transformImportsConfig),
					analyzer(analyzerConfig),
				]
			: []),
	];

	return {
		plugins,

		build: {
			rolldownOptions: {
				output: {
					codeSplitting: {
						groups: [
							{
								name: 'vendor-charts',
								test: /node_modules[\\/](recharts|d3-|victory-vendor)[\\/]/,
							},
						],
					},
				},
			},
		},

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
	};
});
