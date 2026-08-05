import type { TradeDateRangeResponse } from '@/shared/api';

import { useUrlFilters } from '@/shared/lib/url-filters';

import {
	getProfitChartFiltersFromSettings,
	getProfitChartSettingsFromFilters,
	profitChartFiltersSchema,
} from './profit-chart-filters';
import { normalizeProfitChartSettings } from './profit-chart-settings';

export function useProfitChartSettings(dateRange?: TradeDateRangeResponse) {
	const { filters, setFilters } = useUrlFilters(profitChartFiltersSchema);
	const settings = getProfitChartSettingsFromFilters(filters, dateRange);

	return {
		settings,
		hasDateRange: Boolean(dateRange?.minDate && dateRange?.maxDate),
		setSettings: (nextSettings: Partial<typeof settings>) => {
			const next = normalizeProfitChartSettings({ ...settings, ...nextSettings }, dateRange);
			setFilters(getProfitChartFiltersFromSettings(next));
		},
	};
}
