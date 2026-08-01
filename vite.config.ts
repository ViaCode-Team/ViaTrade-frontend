import babel from '@rolldown/plugin-babel';
import transformImports from '@rolldown/plugin-transform-imports';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig, type PluginOption } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { VitePWA } from 'vite-plugin-pwa';

import { analyzerConfig } from './config/vite/analyzer.ts';
import { proxyConfig } from './config/vite/proxy.ts';
import { pwaConfig } from './config/vite/pwa.ts';
import { transformImportsConfig } from './config/vite/transform-imports.ts';

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
				'@': resolve(import.meta.dirname, './src'),
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
