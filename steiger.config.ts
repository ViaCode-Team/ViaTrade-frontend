import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
	...fsd.configs.recommended,
	{
		rules: {
			'fsd/no-segmentless-slices': 'off',
		},
	},
	{
		ignores: [
			'./src/**/gen/**',
			'./src/shared/assets/**',
		],
	},
]);
