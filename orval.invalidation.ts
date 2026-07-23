import type { MutationInvalidatesConfig } from 'orval';

export const authMutationInvalidates = [
	{
		onMutations: ['login', 'register'],
		invalidates: [
			'getUserSessions',
			{ query: 'getMe', file: '@/entities/user' },
		],
	},
	{
		onMutations: ['refreshToken'],
		invalidates: ['getUserSessions'],
	},
	{
		onMutations: ['logout', 'logoutAll'],
		invalidates: [
			{ query: 'getUserSessions', invalidateMode: 'reset' },
			{ query: 'getMe', file: '@/entities/user', invalidateMode: 'reset' },
		],
	},
] satisfies MutationInvalidatesConfig;

export const strategyMutationInvalidates = [
	{
		onMutations: ['createUserStrategyCode', 'deleteUserStrategyCode'],
		invalidates: [
			'getStrategyStatistics',
			'getUserStrategyCodes',
			{ query: 'getStrategyResults', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getStrategyResultsByCode', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getStrategyResultStatistics', file: '@/entities/signal', invalidateMode: 'reset' },
		],
	},
	{
		onMutations: ['createUserStrategy', 'deleteUserStrategy'],
		invalidates: [
			'getStrategyStatistics',
			'getUserStrategies',
			'getUserStrategyCodes',
			{ query: 'getStrategyResults', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getStrategyResultsByCode', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getStrategyResultStatistics', file: '@/entities/signal', invalidateMode: 'reset' },
		],
	},
] satisfies MutationInvalidatesConfig;

export const noteMutationInvalidates = [
	{
		onMutations: [
			'addUserInstrumentNote',
			'updateUserInstrumentNote',
			'deleteUserInstrumentNote',
		],
		invalidates: [
			'getNoteStatistics',
			'getUserNotes',
			{ query: 'getUserInstrumentNote', params: ['tradeCodeId'] },
		],
	},
	{
		onMutations: [
			'addUserStrategyNote',
			'updateUserStrategyNote',
			'deleteUserStrategyNote',
		],
		invalidates: [
			'getNoteStatistics',
			'getUserNotes',
			{ query: 'getUserStrategyNote', params: ['strategyId'] },
		],
	},
] satisfies MutationInvalidatesConfig;

export const remindMutationInvalidates = [
	{
		onMutations: ['createUserRemind'],
		invalidates: [
			'getReminderStatistics',
			'getUserReminders',
			{ query: 'getUserRemindersByInstrument', params: ['tradeCodeId'] },
			'getDueReminders',
		],
	},
	{
		onMutations: ['updateUserReminder', 'deleteUserReminder'],
		invalidates: [
			'getReminderStatistics',
			'getUserReminders',
			'getDueReminders',
			{ query: 'getUserReminderById', params: ['id'] },
		],
	},
	{
		onMutations: ['deleteDueReminder'],
		invalidates: [
			'getReminderStatistics',
			'getUserReminders',
			'getDueReminders',
			{ query: 'getUserReminderById', params: ['id'] },
		],
	},
] satisfies MutationInvalidatesConfig;

export const tradeMutationInvalidates = [
	{
		onMutations: ['createUserTrade'],
		invalidates: ['getUserTrades', 'getTradeStatistics'],
	},
	{
		onMutations: ['updateUserTrade', 'deleteUserTrade'],
		invalidates: [
			'getUserTrades',
			'getTradeStatistics',
			{ query: 'getTradeById', params: ['id'] },
		],
	},
] satisfies MutationInvalidatesConfig;

export const userMutationInvalidates = [
	{
		onMutations: ['linkTelegramToken'],
		invalidates: ['generateTelegramToken', 'getMe'],
	},
] satisfies MutationInvalidatesConfig;
