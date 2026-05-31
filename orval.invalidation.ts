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
		invalidates: [
			'getAllInstrumentsLink',
			{ query: 'getResult', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getResultByStrategyAndTradeCode', file: '@/entities/signal', invalidateMode: 'reset' },
		],
	},
	{
		onMutations: ['createUsersStrategy', 'deleteUsersStrategy'],
		invalidates: [
			'getUsersStrategy',
			'getAllInstrumentsLink',
			{ query: 'getResult', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getResultByStrategyAndTradeCode', file: '@/entities/signal', invalidateMode: 'reset' },
		],
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

export const remindMutationInvalidates = [
	{
		onMutations: [
			'createInstrumentRemind',
		],
		invalidates: [
			'getAllByUser',
			{ query: 'getTradeRemindByUserInstrument', params: ['idInstrument'] },
		],
	},
	{
		onMutations: [
			'updateRemind',
			'deleteRemind',
		],
		invalidates: [
			'getAllByUser',
			'getTradeRemindByUserInstrument',
		],
	},
] satisfies MutationInvalidatesConfig;

export const statisticMutationInvalidates = [
	{
		onMutations: ['createTrade'],
		invalidates: ['getByUser'],
	},
	{
		onMutations: ['updateTrade', 'deleteTrade'],
		invalidates: [
			'getByUser',
			{ query: 'getTradeById', params: ['id'] },
		],
	},
] satisfies MutationInvalidatesConfig;
