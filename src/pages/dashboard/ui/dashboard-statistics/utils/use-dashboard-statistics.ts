import { useMemo } from 'react';

import { useGetByUserSuspense } from '@/entities/statistic';

export function useDashboardStatistics() {
	const { data } = useGetByUserSuspense();
	const trades = data.data;

	return useMemo(() => {
		const totalTrades = trades.length;

		let totalProfit = 0;
		let totalLoss = 0;
		let profitableTrades = 0;
		let losingTrades = 0;

		for (const trade of trades) {
			const income = trade.netIncome ?? 0;
			if (income > 0) {
				totalProfit += income;
				profitableTrades++;
			}
			else if (income < 0) {
				totalLoss += Math.abs(income);
				losingTrades++;
			}
		}

		const netProfit = totalProfit - totalLoss;
		const averageProfit = totalTrades > 0 ? netProfit / totalTrades : 0;
		const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;
		const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? Infinity : 0;

		return {
			totalTrades,
			profitableTrades,
			losingTrades,
			netProfit,
			averageProfit,
			winRate,
			profitFactor,
		};
	}, [trades]);
}
