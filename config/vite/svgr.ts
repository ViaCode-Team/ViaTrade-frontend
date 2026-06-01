import type svgr from 'vite-plugin-svgr';

export const svgrConfig: NonNullable<Parameters<typeof svgr>[0]> = {
	include: '**/*.svg?react',
	exclude: 'node_modules/**',
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
};
