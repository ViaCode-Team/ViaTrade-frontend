import type { MutationInvalidatesConfig } from 'orval';

export const authMutationInvalidates = [
	{
		onMutations: ['login', 'register'],
		invalidates: [
			'getSessions',
			'getSessionsInfinite',
			{ query: 'getMe', file: '@/entities/user' },
		],
	},
	{
		onMutations: ['refresh'],
		invalidates: ['getSessions', 'getSessionsInfinite'],
	},
	{
		onMutations: ['logout', 'logoutAll'],
		invalidates: [
			{ query: 'getSessions', invalidateMode: 'reset' },
			{ query: 'getSessionsInfinite', invalidateMode: 'reset' },
			{ query: 'getMe', file: '@/entities/user', invalidateMode: 'reset' },
		],
	},
] satisfies MutationInvalidatesConfig;

export const strategyMutationInvalidates = [
	{
		onMutations: ['createInstrumentsLink', 'deleteInstrumentsLink'],
		invalidates: ['getAllInstrumentsLink'],
	},
	{
		onMutations: ['createUsersStrategy', 'deleteUsersStrategy'],
		invalidates: ['getUsersStrategy', 'getAllInstrumentsLink'],
	},
] satisfies MutationInvalidatesConfig;
