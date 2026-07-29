import type { InputOptions, Options, OutputOptions } from 'orval';

import { deepmerge } from 'deepmerge-ts';
import { defineConfig } from 'orval';

import {
	instrumentMutationInvalidates,
	reminderMutationInvalidates,
	sessionMutationInvalidates,
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
	instrumentApi: createApiConfig('Instruments', 'instrument', {
		output: {
			override: {
				query: {
					mutationInvalidates: instrumentMutationInvalidates,
				},
			},
		},
	}),
	noteApi: createApiConfig('Notes', 'note'),
	reminderApi: createApiConfig('Reminders', 'reminder', {
		output: {
			override: {
				query: {
					mutationInvalidates: reminderMutationInvalidates,
				},
			},
		},
	}),
	sessionApi: createApiConfig('Sessions', 'session', {
		output: {
			override: {
				query: {
					mutationInvalidates: sessionMutationInvalidates,
				},
			},
		},
	}),
	signalApi: createApiConfig('Signals', 'signal'),
	strategyApi: createApiConfig('Strategies', 'strategy', {
		output: {
			override: {
				query: {
					mutationInvalidates: strategyMutationInvalidates,
				},
			},
		},
	}),
	tradeApi: createApiConfig('Trades', 'trade', {
		output: {
			override: {
				query: {
					mutationInvalidates: tradeMutationInvalidates,
				},
			},
		},
	}),
	userApi: createApiConfig('Users', 'user', {
		output: {
			override: {
				query: {
					mutationInvalidates: userMutationInvalidates,
				},
			},
		},
	}),
});
