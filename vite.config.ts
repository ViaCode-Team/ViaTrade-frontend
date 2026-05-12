import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
// import { VitePWA } from 'vite-plugin-pwa';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';

const proxy = {
	'/api': {
		target: 'https://localhost:7249',
		changeOrigin: true,
		secure: false,
	},
} as const;

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		babel({
			presets: [reactCompilerPreset()],
		}),
		// VitePWA(),
		svgr({
			svgrOptions: {
				plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
				svgoConfig: {
					floatPrecision: 2,
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									removeViewBox: false,
								},
							},
						},
					],
				},
			},
		}),
		analyzer({
			openAnalyzer: false,
			exclude: [
				/\.woff2?$/,
			],
		}),
	],

	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},

	server: {
		proxy,
	},

	preview: {
		proxy,
	},
});
