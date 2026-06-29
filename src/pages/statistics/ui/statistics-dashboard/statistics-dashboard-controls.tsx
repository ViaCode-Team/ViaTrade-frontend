import { Input, SegmentedControl } from '@mantine/core';
import { DateInput } from '@mantine/dates';

import { DATE_DISPLAY_FORMAT } from '@/shared/model';

import type {
	ProfitChartGranularity,
	ProfitChartSettings,
} from '../../model/statistics-dashboard-types';

import {
	getMaxProfitChartStartDate,
	getMinProfitChartEndDate,
} from '../../model/profit-chart-settings';
import { PROFIT_CHART_GRANULARITY_OPTIONS } from '../../model/statistics-dashboard-types';
import cls from './statistics-dashboard.module.css';

type StatisticsDashboardControlsProps = {
	settings: ProfitChartSettings;
	maxEndDate: string;
	onStartDateChange: (value: string | null) => void;
	onEndDateChange: (value: string | null) => void;
	onGranularityChange: (value: ProfitChartGranularity) => void;
};

export function StatisticsDashboardControls({
	settings,
	maxEndDate,
	onStartDateChange,
	onEndDateChange,
	onGranularityChange,
}: StatisticsDashboardControlsProps) {
	const maxStartDate = getMaxProfitChartStartDate(settings.endDate, settings.granularity);
	const minEndDate = getMinProfitChartEndDate(settings.startDate, settings.granularity);

	return (
		<div className={cls.chartControls}>
			<DateInput
				label='Начало'
				placeholder='Дата начала'
				value={settings.startDate}
				onChange={onStartDateChange}
				maxDate={maxStartDate}
				valueFormat={DATE_DISPLAY_FORMAT}
			/>

			<DateInput
				label='Конец'
				placeholder='Дата конца'
				value={settings.endDate}
				onChange={onEndDateChange}
				minDate={minEndDate}
				maxDate={maxEndDate}
				valueFormat={DATE_DISPLAY_FORMAT}
			/>

			<Input.Wrapper className={cls.granularityControl} label='Период'>
				<SegmentedControl<ProfitChartGranularity>
					name='profit-chart-granularity'
					data={[...PROFIT_CHART_GRANULARITY_OPTIONS]}
					value={settings.granularity}
					onChange={onGranularityChange}
					fullWidth
				/>
			</Input.Wrapper>
		</div>
	);
}
