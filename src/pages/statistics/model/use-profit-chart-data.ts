import { useMemo, useState } from 'react';

import { useGetByUserSuspense } from '@/entities/trade';
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
	const { data: allTradesResponse } = useGetByUserSuspense();

	const settings = useMemo(
		() => getProfitChartSettingsFromFilters(filters, allTradesResponse.data, maxEndDate),
		[allTradesResponse.data, filters, maxEndDate],
	);
	const chartDateRangeParams = useMemo(
		() => getProfitChartDateRangeParams(settings),
		[settings],
	);
	const { data: chartTradesResponse } = useGetByUserSuspense(chartDateRangeParams);

	return {
		settings,
		trades: chartTradesResponse.data,
	};
}
