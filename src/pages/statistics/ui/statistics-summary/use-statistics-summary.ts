import { useMemo } from 'react';

import { useGetByUserSuspense } from '@/entities/statistic';

export function useStatisticsSummary() {
	const { data } = useGetByUserSuspense();
	const trades = data.data;

	const { totalTrades, profitableTrades, totalNetIncome } = useMemo(() => {
		let profitable = 0;
		let netIncome = 0;

		for (const t of trades) {
			const income = t.netIncome ?? 0;
			if (income > 0) {
				profitable++;
			}
			netIncome += income;
		}

		return {
			totalTrades: trades.length,
			profitableTrades: profitable,
			totalNetIncome: netIncome,
		};
	}, [trades]);

	const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;

	return {
		totalTrades,
		winRate,
		totalNetIncome,
	};
}
