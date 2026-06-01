import type { VitePWAOptions } from 'vite-plugin-pwa';

export const pwaConfig: Partial<VitePWAOptions> = {
	registerType: 'autoUpdate',
	includeAssets: [
		'assets/favicon/favicon.ico',
		'assets/favicon/apple-touch-icon.png',
		'assets/favicon/favicon.svg',
		'assets/favicon/favicon-96x96.png',
		'assets/favicon/web-app-manifest-192x192.png',
		'assets/favicon/web-app-manifest-512x512.png',
	],
	includeManifestIcons: false,
	workbox: {
		globPatterns: ['**/*.{js,css,html}'],
		runtimeCaching: [
			{
				urlPattern: /\.(?:woff|woff2|ttf|eot)$/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'fonts',
					expiration: {
						maxEntries: 20,
						maxAgeSeconds: 60 * 60 * 24 * 365, // Храним 1 год
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},
	manifest: {
		name: 'ViaTrade',
		short_name: 'ViaTrade',
		description: 'Modern stock market analysis platform.',
		theme_color: '#ffffff',
		background_color: '#ffffff',
		display: 'standalone',
		icons: [
			{
				src: '/assets/favicon/favicon-96x96.png',
				sizes: '96x96',
				type: 'image/png',
			},
			{
				src: '/assets/favicon/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/assets/favicon/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: '/assets/favicon/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
		// screenshots: [
		// 	{
		// 		src: '/assets/screenshots/desktop.png',
		// 		sizes: '1280x720',
		// 		type: 'image/png',
		// 		form_factor: 'wide',
		// 	},
		// 	{
		// 		src: '/assets/screenshots/mobile.png',
		// 		sizes: '720x1280',
		// 		type: 'image/png',
		// 	},
		// ],
	},
};
