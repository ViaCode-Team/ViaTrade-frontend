import antfu from '@antfu/eslint-config';

export default antfu(
	{
		react: true,

		stylistic: {
			indent: 'tab',
			quotes: 'single',
			semi: true,
		},

		jsonc: false,
		yaml: false,
		toml: false,
		markdown: false,
		imports: false,
	},
	{
		rules: {
			'eqeqeq': 'warn',

			'style/object-curly-newline': ['warn', {
				ObjectExpression: {
					multiline: true,
					consistent: true,
					minProperties: 5,
				},
				ObjectPattern: {
					multiline: true,
					consistent: true,
					minProperties: 5,
				},
				ImportDeclaration: {
					multiline: true,
					consistent: true,
					minProperties: 5,
				},
				ExportDeclaration: {
					multiline: true,
					consistent: true,
					minProperties: 5,
				},
			}],

			'style/jsx-quotes': ['warn', 'prefer-single'],
			'style/no-multiple-empty-lines': ['warn', {
				max: 2,
				maxBOF: 0,
				maxEOF: 0,
			}],
			'style/quote-props': 'off',
			'style/arrow-parens': ['warn', 'always'],
			'style/no-trailing-spaces': 'warn',

			'perfectionist/sort-named-imports': ['warn', { newlinesBetween: 1 }],
			'perfectionist/sort-named-exports': ['warn', { newlinesBetween: 1 }],
			'perfectionist/sort-imports': ['warn', { newlinesBetween: 1 }],
			'perfectionist/sort-exports': ['warn', { newlinesBetween: 1 }],

			'ts/consistent-type-definitions': ['warn', 'type'],
			'no-console': 'warn',
		},
	},
	{
		files: ['**/gen/**'],
		rules: {
			'style/max-statements-per-line': 'off',

			'perfectionist/sort-named-imports': 'off',
			'perfectionist/sort-named-exports': 'off',
			'perfectionist/sort-imports': 'off',
			'perfectionist/sort-exports': 'off',
		},
	},
);
