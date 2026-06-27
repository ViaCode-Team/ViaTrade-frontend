import { useGetByUserSuspense } from '../api/gen';

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

export function useTradeStatisticsBase() {
	const { data } = useGetByUserSuspense();
	const trades = data.data;

	let profitableTrades = 0;
	let totalIncome = 0;

	for (const trade of trades) {
		const income = trade.netIncome ?? 0;

		if (income > 0) {
			profitableTrades++;
		}

		totalIncome += income;
	}

	const totalTrades = trades.length;
	const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;

	return {
		trades,
		totalTrades,
		winRate,
		totalIncome,
	};
}
