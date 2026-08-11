import type { MutationInvalidatesConfig } from 'orval';

export const sessionMutationInvalidates = [
	{
		onMutations: ['login'],
		invalidates: [
			'getSessions',
			{ query: 'getMe', file: '@/entities/user' },
		],
	},
	{
		onMutations: ['createCurrentSessionTokens'],
		invalidates: ['getSessions'],
	},
	{
		onMutations: ['deleteCurrentSession', 'deleteSessions'],
		invalidates: [
			{ query: 'getSessions', invalidateMode: 'reset' },
			{ query: 'getMe', file: '@/entities/user', invalidateMode: 'reset' },
		],
	},
] satisfies MutationInvalidatesConfig;

export const instrumentMutationInvalidates = [
	{
		onMutations: ['upsertInstrumentNote', 'deleteInstrumentNote'],
		invalidates: [
			{ query: 'getInstrumentNote', params: ['instrumentId'] },
			{ query: 'getNoteStatistics', file: '@/entities/note' },
			{ query: 'getNotes', file: '@/entities/note' },
		],
	},
	{
		onMutations: ['createInstrumentReminder'],
		invalidates: [
			{ query: 'getInstrumentReminders', params: ['instrumentId'] },
			{ query: 'getReminderStatistics', file: '@/entities/reminder' },
			{ query: 'getReminders', file: '@/entities/reminder' },
		],
	},
] satisfies MutationInvalidatesConfig;

export const strategyMutationInvalidates = [
	{
		onMutations: ['addInstrumentToStrategy', 'deleteInstrumentFromStrategy'],
		invalidates: [
			'getStrategyStatistics',
			'getStrategies',
			{ query: 'getInstrumentsByStrategy', params: ['strategyId'] },
			{ query: 'getStrategiesByInstrument', file: '@/entities/instrument', params: ['instrumentId'] },
			{ query: 'getSignals', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getLatestSignals', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getStatistics', file: '@/entities/signal', invalidateMode: 'reset' },
		],
	},
	{
		onMutations: ['updateStrategy'],
		invalidates: [
			'getStrategyStatistics',
			'getStrategies',
			{ query: 'getStrategyById', params: ['strategyId'] },
			{ query: 'getSignals', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getLatestSignals', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getStatistics', file: '@/entities/signal', invalidateMode: 'reset' },
		],
	},
	{
		onMutations: ['upsertStrategyNote', 'deleteStrategyNote'],
		invalidates: [
			{ query: 'getStrategyNote', params: ['strategyId'] },
			{ query: 'getNoteStatistics', file: '@/entities/note' },
			{ query: 'getNotes', file: '@/entities/note' },
		],
	},
] satisfies MutationInvalidatesConfig;

export const reminderMutationInvalidates = [
	{
		onMutations: ['updateReminder', 'deleteReminder'],
		invalidates: [
			'getReminderStatistics',
			'getReminders',
			{ query: 'getReminderById', params: ['reminderId'] },
		],
	},
] satisfies MutationInvalidatesConfig;

export const tradeMutationInvalidates = [
	{
		onMutations: ['createTrade'],
		invalidates: ['getTrades', 'getTradeStatistics'],
	},
	{
		onMutations: ['updateTrade', 'deleteTrade'],
		invalidates: [
			'getTrades',
			'getTradeStatistics',
			{ query: 'getTradeById', params: ['tradeId'] },
		],
	},
] satisfies MutationInvalidatesConfig;

export const userMutationInvalidates = [
	{
		onMutations: ['register'],
		invalidates: ['getMe', { query: 'getSessions', file: '@/entities/session' }],
	},
] satisfies MutationInvalidatesConfig;
