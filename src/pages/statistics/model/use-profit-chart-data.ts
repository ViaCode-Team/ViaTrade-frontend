import { useMemo, useState } from 'react';

import { useGetTradesSuspense } from '@/entities/trade';
import { useUrlFilters } from '@/shared/lib/url-filters';

import {
	getProfitChartSettingsFromFilters,
	profitChartFiltersSchema,
} from './profit-chart-filters';
import {
	formatProfitChartDate,
	getProfitChartDateRangeParams,
} from './profit-chart-settings';

export function useProfitChartData() {
	const { filters } = useUrlFilters(profitChartFiltersSchema);
	const [maxEndDate] = useState(() => formatProfitChartDate(new Date()));
	const { data: allTradesResponse } = useGetTradesSuspense({ page: 1, pageSize: 100 });
	const allTrades = useMemo(
		() => allTradesResponse.data.items,
		[allTradesResponse.data],
	);

	const settings = useMemo(
		() => getProfitChartSettingsFromFilters(filters, allTrades, maxEndDate),
		[allTrades, filters, maxEndDate],
	);
	const chartDateRangeParams = useMemo(
		() => getProfitChartDateRangeParams(settings),
		[settings],
	);
	const { data: chartTradesResponse } = useGetTradesSuspense({ ...chartDateRangeParams, page: 1, pageSize: 100 });

	return {
		settings,
		trades: chartTradesResponse.data.items,
	};
}
