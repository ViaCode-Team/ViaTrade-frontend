import type { InputOptions, Options, OutputOptions } from 'orval';

import { deepmerge } from 'deepmerge-ts';
import { defineConfig } from 'orval';

import {
	authMutationInvalidates,
	strategyMutationInvalidates,
} from './orval.invalidation';

const SWAGGER_PATH = './swagger.yaml';
const SCHEMAS_PATH = './src/shared/api/types/gen';

const defaultOptions: Partial<Options> = {
	hooks: {
		afterAllFilesWrite: 'eslint --fix',
	},
} as const;

const defaultOutput = {
	mode: 'split',
	httpClient: 'fetch',
	client: 'react-query',
	schemas: SCHEMAS_PATH,
	indexFiles: false,
	clean: false,

	override: {
		useTypeOverInterfaces: true,
		useBigInt: true,
		// todo: open issue for this
		useDates: false,
		// In future
		formData: true,

		contentType: {
			include: ['application/json', 'application/problem+json'],
		},

		fetch: {
			forceSuccessResponse: true,
		},

		query: {
			useMutation: true,
			useSuspenseQuery: true,
			usePrefetch: true,
			useInvalidate: true,
			useOperationIdAsQueryKey: true,
			signal: true,
		},

		mutator: {
			path: './src/shared/api/client/custom-instance-fetch.ts',
			name: 'customInstance',
		},
	},
} satisfies Partial<OutputOptions>;

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
			target: SWAGGER_PATH,
			filters: { mode: 'include', tags: [tagName] },
			...overrides?.input,
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
				mutationInvalidates: authMutationInvalidates,
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

const strategyApiConfig = createApiConfig('Strategy', 'strategy', {
	output: {
		override: {
			query: {
				mutationInvalidates: strategyMutationInvalidates,
			},
		},
	},
});

export default defineConfig({
	authApi: authApiConfig,
	usersApi: createApiConfig('User', 'user'),
	signalApi: createApiConfig('Result', 'signal'),
	strategyApi: strategyApiConfig,
});
