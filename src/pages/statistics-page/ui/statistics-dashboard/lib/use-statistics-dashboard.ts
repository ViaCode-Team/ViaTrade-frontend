import dayjs from 'dayjs';
import { useMemo } from 'react';

import { useGetByUserSuspense } from '@/entities/statistic/api/gen';

export function useStatisticsDashboard() {
	const { data } = useGetByUserSuspense();

	const trades = data.data;

	const totalTrades = trades.length;

	const profitableTrades = useMemo(
		() => trades.filter((t) => (t.netIncome ?? 0) > 0).length,
		[trades],
	);

	const lossTrades = totalTrades - profitableTrades;

	const pnlData = useMemo(() => {
		const sortedTrades = [...trades].sort(
			(a, b) =>
				dayjs(a.dateClose ?? a.dateOpen).valueOf()
				- dayjs(b.dateClose ?? b.dateOpen).valueOf(),
		);

		let cumulativePnL = 0;
		return sortedTrades.map((t) => {
			cumulativePnL += t.netIncome ?? 0;
			return {
				date: dayjs(t.dateClose ?? t.dateOpen).format('MMM D, YYYY'),
				Сумма: Number(cumulativePnL.toFixed(2)),
			};
		});
	}, [trades]);

	const winLossData = useMemo(
		() => [
			{ name: 'Прибыльные', value: profitableTrades, color: 'teal.6' },
			{ name: 'Убыточные', value: lossTrades, color: 'red.6' },
		],
		[profitableTrades, lossTrades],
	);

	const barData = useMemo(() => {
		const tradesBySignal = trades.reduce<Record<string, number>>((acc, t) => {
			const signal = t.tradeSignal === -1 ? 'Short' : 'Long';
			acc[signal] = (acc[signal] ?? 0) + 1;
			return acc;
		}, {});

		return Object.entries(tradesBySignal).map(([type, count]) => ({
			type,
			Count: count,
		}));
	}, [trades]);

	return {
		totalTrades,
		pnlData,
		winLossData,
		barData,
	};
}
