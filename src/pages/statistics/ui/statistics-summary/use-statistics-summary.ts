import { useMemo } from 'react';

import { useTradeStatisticsBase } from '@/entities/statistic';

export function useStatisticsSummary() {
	const { trades, totalTrades, winRate, totalIncome } = useTradeStatisticsBase();

	const { profitableTrades, losingTrades, averageIncome, profitFactor } = useMemo(() => {
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

		const averageIncome = totalTrades > 0 ? totalIncome / totalTrades : 0;
		const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? Infinity : 0;

		return {
			profitableTrades,
			losingTrades,
			averageIncome,
			profitFactor,
		};
	}, [totalIncome, totalTrades, trades]);

	return {
		totalTrades,
		winRate,
		totalIncome,
		profitableTrades,
		losingTrades,
		averageIncome,
		profitFactor,
	};
}
