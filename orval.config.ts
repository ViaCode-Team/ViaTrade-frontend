import {
	defineConfig,
	type InputOptions,
	type OutputOptions,
} from 'orval';

const baseOutput: Partial<OutputOptions> = {
	mode: 'split',
	httpClient: 'axios',
	client: 'react-query',
	// prettier: true,
	// clean: true,
	mock: true,

	override: {
		useTypeOverInterfaces: true,
		useDates: true,
		useBigInt: true,

		query: {
			useQuery: true,
			useMutation: true,
			// useSuspenseQuery: true,
			// usePrefetch: true,
			useInvalidate: true,
			useOperationIdAsQueryKey: true,
			signal: true,

			mutationInvalidates: [
				{
					onMutations: ['login', 'register'],
					invalidates: [
						{ query: 'getSessions', invalidateMode: 'invalidate' },
						{ query: 'getSessionsInfinite', invalidateMode: 'invalidate' },
						{ query: 'getMe', invalidateMode: 'invalidate', file: '@/entities/user' },
					],
				},
				{
					onMutations: ['refresh'],
					invalidates: [
						{ query: 'getSessions', invalidateMode: 'invalidate' },
						{ query: 'getSessionsInfinite', invalidateMode: 'invalidate' },
					],
				},
				{
					onMutations: ['logout', 'logoutAll'],
					invalidates: [
						{ query: 'getSessions', invalidateMode: 'reset' },
						{ query: 'getSessionsInfinite', invalidateMode: 'reset' },
						{ query: 'getMe', invalidateMode: 'reset', file: '@/entities/user' },
					],
				},
			],
		},

		operations: {
			'GetSessions': {
				query: {
					useInfinite: true,
				},
			},
		},

	},
} as const;

const baseInput: InputOptions = { target: './swagger.yml' } as const;

export default defineConfig({
	authApi: {
		input: {
			...baseInput,
			filters: { mode: 'include', tags: ['Auth'] },
		},
		output: {
			...baseOutput,
			target: './src/entities/auth/api/gen/index.ts',
			schemas: './src/shared/api/gen/types',
		},
		hooks: {
			afterAllFilesWrite: 'eslint --fix',
		},
	},

	usersApi: {
		input: {
			...baseInput,
			filters: { mode: 'include', tags: ['User'] },
		},
		output: {
			...baseOutput,
			target: './src/entities/user/api/gen/index.ts',
			schemas: './src/shared/api/gen/types',
		},
		hooks: {
			afterAllFilesWrite: 'eslint --fix',
		},
	},
});
