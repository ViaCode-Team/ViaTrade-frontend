import type { InputOptions, Options, OutputOptions } from 'orval';

import { deepmerge } from 'deepmerge-ts';
import { defineConfig } from 'orval';

const SWAGGER_PATH = './swagger.yml';
const SCHEMAS_PATH = './src/shared/api/gen/types';

const defaultOptions: Partial<Options> = {
	hooks: {
		afterAllFilesWrite: 'eslint --fix',
	},
} as const;

const defaultInput: InputOptions = {
	target: SWAGGER_PATH,
} as const;

const defaultOutput: Partial<OutputOptions> = {
	mode: 'split',
	httpClient: 'fetch',
	client: 'react-query',
	schemas: SCHEMAS_PATH,
	mock: true,

	override: {
		useTypeOverInterfaces: true,
		useDates: true,
		useBigInt: true,
		formData: true,

		contentType: {
			include: ['application/json', 'application/problem+json'],
		},

		fetch: {
			forceSuccessResponse: true,
		},

		query: {
			useQuery: true,
			useMutation: true,
			// useSuspenseQuery: true,
			// usePrefetch: true,
			useInvalidate: true,
			useOperationIdAsQueryKey: true,
			signal: true,
		},

		// mutator: {
		// 	path: './src/shared/api/client/custom-instance-axios.ts',
		// 	name: 'customInstanceAxios',
		// },

		mutator: {
			path: './src/shared/api/client/custom-instance-fetch.ts',
			name: 'customInstance',
		},
	},
} as const;

function createApiConfig(
	tagName: string,
	entitiesName: string,
	overrides?: {
		input?: Partial<InputOptions>;
		output?: Partial<OutputOptions>;
		options?: Partial<Options>;
	},
): Options {
	return {
		...deepmerge(defaultOptions, overrides?.options ?? {}),

		input: {
			filters: { mode: 'include', tags: [tagName] },
			...deepmerge(defaultInput, overrides?.input ?? {}),
		},

		output: {
			target: `./src/entities/${entitiesName}/api/gen/index.ts`,
			...deepmerge(defaultOutput, overrides?.output ?? {}),
		},
	};
}

const authApiConfig = createApiConfig('Auth', 'auth', {
	output: {
		override: {
			query: {
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
	},
});

export default defineConfig({
	authApi: authApiConfig,
	usersApi: createApiConfig('User', 'user', {
		output: {
			override: {

				operations: {
					'GetMe': {
						query: {
							useSuspenseQuery: true,
						},
					},
				},
			},
		},
	}),
});
