import { useIsFetching } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import {
	getGetUserTradesQueryKey,
	normalizeTradePage,
	useGetUserTrades,
} from '@/entities/trade';
import { useUrlFilters } from '@/shared/lib/url-filters';

import type { ProfitChartGranularity } from './profit-chart-settings';

import {
	getProfitChartFiltersFromSettings,
	getProfitChartSettingsFromFilters,
	profitChartFiltersSchema,
} from './profit-chart-filters';
import {
	formatProfitChartDate,
	normalizeProfitChartSettings,
} from './profit-chart-settings';

export function useProfitChartControls() {
	const { filters, setFilters } = useUrlFilters(profitChartFiltersSchema);
	const tradesQuery = useGetUserTrades({ page: 1, pageSize: 100 });
	const isFetchingTrades = useIsFetching({ queryKey: getGetUserTradesQueryKey() });
	const [maxEndDate] = useState(() => formatProfitChartDate(new Date()));

	const trades = useMemo(
		() => normalizeTradePage(tradesQuery.data?.data).items,
		[tradesQuery.data?.data],
	);
	const settings = useMemo(
		() => getProfitChartSettingsFromFilters(filters, trades, maxEndDate),
		[filters, maxEndDate, trades],
	);

	const updateSettings = (nextSettings: Partial<typeof settings>) => {
		const normalizedSettings = normalizeProfitChartSettings(
			{
				...settings,
				...nextSettings,
			},
			maxEndDate,
		);

		setFilters(getProfitChartFiltersFromSettings(normalizedSettings));
	};

	const handleStartDateChange = (value: string | null) => {
		if (!value)
			return;

		updateSettings({ startDate: value });
	};

	const handleEndDateChange = (value: string | null) => {
		if (!value)
			return;

		updateSettings({ endDate: value });
	};

	const handleGranularityChange = (value: ProfitChartGranularity) => {
		updateSettings({ granularity: value });
	};

	const isLoading = tradesQuery.isLoading || isFetchingTrades > 0;

	return {
		settings,
		maxEndDate,
		handleStartDateChange,
		handleEndDateChange,
		handleGranularityChange,
		isLoading,
		isDisabled: tradesQuery.isError || trades.length === 0,
	};
}
