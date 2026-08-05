import { useGetTradeDateRange } from '@/entities/trade';

import type { ProfitChartGranularity } from './profit-chart-settings';

import { useProfitChartSettings } from './use-profit-chart-settings';

export function useProfitChartControls() {
	const dateRangeQuery = useGetTradeDateRange();
	const { settings, hasDateRange, setSettings } = useProfitChartSettings(dateRangeQuery.data?.data);

	const handleStartDateChange = (value: string | null) => {
		if (!value)
			return;

		setSettings({ startDate: value });
	};

	const handleEndDateChange = (value: string | null) => {
		if (!value)
			return;

		setSettings({ endDate: value });
	};

	const handleGranularityChange = (value: ProfitChartGranularity) => {
		setSettings({ granularity: value });
	};

	return {
		settings,
		minDate: dateRangeQuery.data?.data.minDate,
		maxDate: dateRangeQuery.data?.data.maxDate,
		handleStartDateChange,
		handleEndDateChange,
		handleGranularityChange,
		isLoading: dateRangeQuery.isLoading,
		isDisabled: dateRangeQuery.isLoading || dateRangeQuery.isError || !hasDateRange,
	};
}
