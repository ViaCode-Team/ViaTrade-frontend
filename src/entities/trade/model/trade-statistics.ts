export const TRADE_STATISTICS_CARDS = {
	totalTrades: {
		title: 'Всего сделок',
	},
	totalIncome: {
		title: 'Общая прибыль',
		getColor: (value: number) => value >= 0 ? 'green' : 'red',
	},
	winRate: {
		title: 'Win Rate',
		getColor: (value: number) => value >= 50 ? 'green' : 'red',
	},
} as const;
