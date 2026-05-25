import type { MutationInvalidatesConfig } from 'orval';

export const authMutationInvalidates = [
	{
		onMutations: ['login', 'register'],
		invalidates: [
			'getSessions',
			{ query: 'getMe', file: '@/entities/user' },
		],
	},
	{
		onMutations: ['refresh'],
		invalidates: ['getSessions'],
	},
	{
		onMutations: ['logout', 'logoutAll'],
		invalidates: [
			{ query: 'getSessions', invalidateMode: 'reset' },
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

export const noteMutationInvalidates = [
	{
		onMutations: [
			'createInstrumentNote',
			'updateInstrumentNote',
			'deleteInstrumentNote',
		],
		invalidates: [
			'getByUserInstrumentAll',
			{ query: 'getByUserInstrument', params: ['idInstrument'] },
		],
	},
	{
		onMutations: [
			'createStrategyNote',
			'updateStrategyNote',
			'deleteStrategyNote',
		],
		invalidates: [
			'getByUserStrategyAll',
			{ query: 'getByUserStrategy', params: ['idStrategy'] },
		],
	},
] satisfies MutationInvalidatesConfig;
