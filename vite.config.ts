import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { VitePWA } from 'vite-plugin-pwa';
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
		VitePWA({
			registerType: 'autoUpdate',
			includeManifestIcons: false,
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,svg,png,woff,woff2}'],
			},
			manifest: {
				name: 'ViaTrade',
				short_name: 'ViaTrade',
				description: 'ViaTrade',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				icons: [
					{
						src: 'assets/favicon/web-app-manifest-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'assets/favicon/web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'assets/favicon/web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
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
