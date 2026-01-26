import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';

export default antfu(
	{
		nextjs: true,

		stylistic: false,
		jsonc: false,
		yaml: false,
		toml: false,
		markdown: false,
		imports: false,
	},
	{
		name: 'nextPlugin',
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
		},
	},
	{
		rules: {
			eqeqeq: 'warn',
			'perfectionist/sort-named-imports': 'warn',
			'perfectionist/sort-named-exports': 'warn',
			'perfectionist/sort-imports': 'warn',
			'perfectionist/sort-exports': 'warn',
			'antfu/no-top-level-await': 'off',
			'ts/consistent-type-definitions': ['error', 'type'],
		},
	},
);
