import { useMemo, useState } from 'react';

import { normalizeTradePage, useGetUserTradesSuspense } from '@/entities/trade';
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
	const { data: allTradesResponse } = useGetUserTradesSuspense({ page: 1, pageSize: 100 });
	const allTrades = useMemo(
		() => normalizeTradePage(allTradesResponse.data).items,
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
	const { data: chartTradesResponse } = useGetUserTradesSuspense({ ...chartDateRangeParams, page: 1, pageSize: 100 });

	return {
		settings,
		trades: normalizeTradePage(chartTradesResponse.data).items,
	};
}
