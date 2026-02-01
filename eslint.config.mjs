import antfu from '@antfu/eslint-config';

export default antfu(
	{
		react: true,

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
			'perfectionist/sort-named-imports': ['warn', { newlinesBetween: 1 }],
			'perfectionist/sort-named-exports': ['warn', { newlinesBetween: 1 }],
			'perfectionist/sort-imports': ['warn', { newlinesBetween: 1 }],
			'perfectionist/sort-exports': ['warn', { newlinesBetween: 1 }],
			'ts/consistent-type-definitions': ['error', 'type'],
			'no-console': 'warn',

			'no-restricted-imports': [
				'error',
				{
					patterns: [{ regex: '^@mui/[^/]+$' }],
				},
			],
		},
	},
);
