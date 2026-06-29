import type { TransformImportsOptions } from '@rolldown/plugin-transform-imports';

export const transformImportsConfig: TransformImportsOptions = {
	'@tabler/icons-react': {
		transform: '@tabler/icons-react/dist/esm/icons/{{member}}.mjs',
	},
};
