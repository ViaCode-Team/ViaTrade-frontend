import type { InputOptions, Options, OutputOptions } from 'orval';

import { deepmerge } from 'deepmerge-ts';
import { defineConfig } from 'orval';

import {
	authMutationInvalidates,
	noteMutationInvalidates,
	remindMutationInvalidates,
	strategyMutationInvalidates,
	tradeMutationInvalidates,
	userMutationInvalidates,
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
			useSuspenseQuery: true,
			usePrefetch: true,
			useInvalidate: true,
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

export default defineConfig({
	authApi: createApiConfig('Auth', 'auth', {
		output: {
			override: {
				query: {
					mutationInvalidates: authMutationInvalidates,
				},
			},
		},
	}),
	usersApi: createApiConfig('Users', 'user', {
		output: {
			override: {
				query: {
					mutationInvalidates: userMutationInvalidates,
				},
			},
		},
	}),
	signalApi: createApiConfig('Results', 'signal'),
	tradeApi: createApiConfig('Trades', 'trade', {
		output: {
			override: {
				query: {
					mutationInvalidates: tradeMutationInvalidates,
				},
			},
		},
	}),
	tradeCodeApi: createApiConfig('TradeCodes', 'trade-code'),
	remindApi: createApiConfig('Reminders', 'remind', {
		output: {
			override: {
				query: {
					mutationInvalidates: remindMutationInvalidates,
				},
			},
		},
	}),
	strategyApi: createApiConfig('Strategies', 'strategy', {
		output: {
			override: {
				query: {
					mutationInvalidates: strategyMutationInvalidates,
				},
			},
		},
	}),
	noteApi: createApiConfig('Notes', 'note', {
		output: {
			override: {
				query: {
					mutationInvalidates: noteMutationInvalidates,
				},
			},
		},
	}),
});
