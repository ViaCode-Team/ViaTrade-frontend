import type { ServerOptions } from 'vite';

export const proxyConfig: NonNullable<ServerOptions['proxy']> = {
	'/api': {
		target: 'https://localhost:7249',
		changeOrigin: true,
		secure: false,
	},
};
