import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { useTradeStatisticsBase } from '@/entities/statistic';

import type { ProfitChartGranularity, ProfitChartSettings } from './statistics-dashboard-types';

import {
	formatProfitChartDate,
	getInitialProfitChartSettings,
	normalizeProfitChartSettings,
} from './profit-chart-settings';

function getProfitChartPointDate(date: string, granularity: ProfitChartGranularity) {
	const tradeDate = dayjs(date);

	if (granularity === 'week') {
		return tradeDate.startOf('week');
	}

	if (granularity === 'month') {
		return tradeDate.startOf('month');
	}

	return tradeDate.startOf('day');
}

function getProfitChartLabel(date: string, granularity: ProfitChartGranularity) {
	const pointDate = dayjs(date);

	if (granularity === 'week') {
		return `${pointDate.format('DD.MM')} - ${pointDate.endOf('week').format('DD.MM')}`;
	}

	if (granularity === 'month') {
		return pointDate.format('MM.YYYY');
	}

	return pointDate.format('DD.MM.YYYY');
}

export function useStatisticsDashboard() {
	const { trades, totalTrades } = useTradeStatisticsBase();
	const [maxEndDate] = useState(() => formatProfitChartDate(new Date()));
	const [profitChartSettings, setProfitChartSettings] = useState<ProfitChartSettings>(() =>
		normalizeProfitChartSettings(getInitialProfitChartSettings(trades), maxEndDate),
	);

	const profitableTrades = useMemo(
		() => trades.filter((t) => (t.netIncome ?? 0) > 0).length,
		[trades],
	);

	const lossTrades = totalTrades - profitableTrades;

	const pnlData = useMemo(() => {
		const startDate = dayjs(profitChartSettings.startDate).startOf('day');
		const endDate = dayjs(profitChartSettings.endDate).endOf('day');
		const pnlByDate = new Map<string, number>();

		for (const trade of trades) {
			const tradeDate = dayjs(trade.dateClose ?? trade.dateOpen);

			if (tradeDate.isBefore(startDate) || tradeDate.isAfter(endDate)) {
				continue;
			}

			const pointDate = getProfitChartPointDate(
				tradeDate.toISOString(),
				profitChartSettings.granularity,
			);
			const pointKey = pointDate.format('YYYY-MM-DD');
			pnlByDate.set(pointKey, (pnlByDate.get(pointKey) ?? 0) + (trade.netIncome ?? 0));
		}

		const sortedEntries = [...pnlByDate.entries()].sort(
			(a, b) =>
				dayjs(a[0]).valueOf()
				- dayjs(b[0]).valueOf(),
		);

		let cumulativePnL = 0;

		return sortedEntries.map(([date, income]) => {
			cumulativePnL += income;

			return {
				date: getProfitChartLabel(date, profitChartSettings.granularity),
				Сумма: Number(cumulativePnL.toFixed(2)),
			};
		});
	}, [trades, profitChartSettings]);

	const handleProfitChartStartDateChange = (value: string | null) => {
		if (!value)
			return;

		setProfitChartSettings((current) =>
			normalizeProfitChartSettings(
				{
					...current,
					startDate: value,
				},
				maxEndDate,
			),
		);
	};

	const handleProfitChartEndDateChange = (value: string | null) => {
		if (!value)
			return;

		setProfitChartSettings((current) =>
			normalizeProfitChartSettings(
				{
					...current,
					endDate: value,
				},
				maxEndDate,
			),
		);
	};

	const handleProfitChartGranularityChange = (value: ProfitChartGranularity) => {
		setProfitChartSettings((current) =>
			normalizeProfitChartSettings(
				{
					...current,
					granularity: value,
				},
				maxEndDate,
			),
		);
	};

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
		profitChartSettings,
		maxEndDate,
		handleProfitChartStartDateChange,
		handleProfitChartEndDateChange,
		handleProfitChartGranularityChange,
		winLossData,
		barData,
	};
}
