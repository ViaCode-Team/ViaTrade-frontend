import { useTradeStatisticsBase } from '@/entities/statistic';

export function useDashboardStatistics() {
	const { totalTrades, winRate, totalIncome } = useTradeStatisticsBase();

	return {
		totalTrades,
		winRate,
		totalIncome,
	};
}
