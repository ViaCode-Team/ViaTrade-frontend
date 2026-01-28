import antfu from '@antfu/eslint-config';

export default antfu(
	{
		react: true,
		nextjs: true,

		stylistic: false,
		jsonc: false,
		yaml: false,
		toml: false,
		markdown: false,
		imports: false,
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
			'no-console': 'warn',
		},
	},
);
