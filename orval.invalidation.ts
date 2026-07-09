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
			'getStrategyStatistics',
			'getAllInstrumentsLink',
			{ query: 'getResult', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getResultByStrategyAndTradeCode', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getResultStatistics', file: '@/entities/signal', invalidateMode: 'reset' },
		],
	},
	{
		onMutations: ['createUsersStrategy', 'deleteUsersStrategy'],
		invalidates: [
			'getStrategyStatistics',
			'getUsersStrategy',
			'getAllInstrumentsLink',
			{ query: 'getResult', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getResultByStrategyAndTradeCode', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getResultStatistics', file: '@/entities/signal', invalidateMode: 'reset' },
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
			'getNoteStatistics',
			'getByUserInstrumentAll',
			{ query: 'getNoteByUserInstrument', params: ['idInstrument'] },
		],
	},
	{
		onMutations: [
			'createStrategyNote',
			'updateStrategyNote',
			'deleteStrategyNote',
		],
		invalidates: [
			'getNoteStatistics',
			'getByUserStrategyAll',
			{ query: 'getByUserStrategy', params: ['idStrategy'] },
		],
	},
] satisfies MutationInvalidatesConfig;

export const remindMutationInvalidates = [
	{
		onMutations: ['create'],
		invalidates: [
			'getRemindStatistics',
			'getAllByUser',
			{ query: 'getByUserInstrument', params: ['idInstrument'] },
			'getActualRemind',
		],
	},
	{
		onMutations: ['update', '_delete'],
		invalidates: [
			'getRemindStatistics',
			'getAllByUser',
			'getActualRemind',
			{ query: 'getRemindById', params: ['remindId'] },
		],
	},
	{
		onMutations: ['deleteActualRemind'],
		invalidates: [
			'getRemindStatistics',
			'getAllByUser',
			'getActualRemind',
			{ query: 'getRemindById', params: ['remindId'] },
		],
	},
] satisfies MutationInvalidatesConfig;

export const tradeMutationInvalidates = [
	{
		onMutations: ['createTrade'],
		invalidates: ['getByUser', 'getTradeStatistics'],
	},
	{
		onMutations: ['updateTrade', 'deleteTrade'],
		invalidates: [
			'getByUser',
			'getTradeStatistics',
			{ query: 'getTradeById', params: ['id'] },
		],
	},
] satisfies MutationInvalidatesConfig;

export const userMutationInvalidates = [
	{
		onMutations: ['postTgToken'],
		invalidates: ['getTgToken', 'getMe'],
	},
] satisfies MutationInvalidatesConfig;
