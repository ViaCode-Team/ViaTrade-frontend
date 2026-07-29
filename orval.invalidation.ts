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
		onMutations: ['refreshCurrentSession'],
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
		onMutations: ['upsertNote', 'deleteNote'],
		invalidates: [
			'getNote',
			{ query: 'getNoteStatistics', file: '@/entities/note' },
			{ query: 'getNotes', file: '@/entities/note' },
		],
	},
	{
		onMutations: ['createReminder'],
		invalidates: [
			'getReminders',
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
			'getInstrumentsByStrategy',
			{ query: 'getStrategiesByInstrument', file: '@/entities/instrument' },
			{ query: 'getSignals', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getLatestSignals', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getStatistics', file: '@/entities/signal', invalidateMode: 'reset' },
		],
	},
	{
		onMutations: ['activateStrategy', 'deactivateStrategy'],
		invalidates: [
			'getStrategyStatistics',
			'getStrategies',
			{ query: 'getSignals', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getLatestSignals', file: '@/entities/signal', invalidateMode: 'reset' },
			{ query: 'getStatistics', file: '@/entities/signal', invalidateMode: 'reset' },
		],
	},
	{
		onMutations: ['upsertNote', 'deleteNote'],
		invalidates: [
			'getNote',
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
			'getReminderById',
			{ query: 'getReminders', file: '@/entities/instrument' },
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
			'getTradeById',
		],
	},
] satisfies MutationInvalidatesConfig;

export const userMutationInvalidates = [
	{
		onMutations: ['register'],
		invalidates: ['getMe', { query: 'getSessions', file: '@/entities/session' }],
	},
] satisfies MutationInvalidatesConfig;
