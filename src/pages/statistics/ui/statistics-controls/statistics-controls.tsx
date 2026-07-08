import '@mantine/dates/styles.css';
import { Input, SegmentedControl } from '@mantine/core';
import { DateInput } from '@mantine/dates';

import { DATE_DISPLAY_FORMAT } from '@/shared/model';

import type { ProfitChartGranularity } from '../../model/profit-chart-settings';

import {
	getMaxProfitChartStartDate,
	getMinProfitChartEndDate,
} from '../../model/profit-chart-settings';
import { PROFIT_CHART_GRANULARITY_OPTIONS } from '../../model/profit-chart-settings';
import { useProfitChartControls } from '../../model/use-profit-chart-controls';
import cls from './statistics-controls.module.css';

export function StatisticsControls() {
	const {
		settings,
		maxEndDate,
		handleStartDateChange,
		handleEndDateChange,
		handleGranularityChange,
		isLoading,
		isDisabled,
	} = useProfitChartControls();
	const maxStartDate = getMaxProfitChartStartDate(settings.endDate, settings.granularity);
	const minEndDate = getMinProfitChartEndDate(settings.startDate, settings.granularity);

	return (
		<div className={cls.controls} aria-busy={isLoading}>
			<DateInput
				label='Начало'
				placeholder='Дата начала'
				value={settings.startDate}
				onChange={handleStartDateChange}
				maxDate={maxStartDate}
				valueFormat={DATE_DISPLAY_FORMAT}
				disabled={isDisabled}
				loading={isLoading}
			/>

			<DateInput
				label='Конец'
				placeholder='Дата конца'
				value={settings.endDate}
				onChange={handleEndDateChange}
				minDate={minEndDate}
				maxDate={maxEndDate}
				valueFormat={DATE_DISPLAY_FORMAT}
				disabled={isDisabled}
				loading={isLoading}
			/>

			<Input.Wrapper className={cls.granularityControl} label='Период'>
				<SegmentedControl<ProfitChartGranularity>
					name='profit-chart-granularity'
					data={[...PROFIT_CHART_GRANULARITY_OPTIONS]}
					value={settings.granularity}
					onChange={handleGranularityChange}
					fullWidth
					disabled={isDisabled}
				/>
			</Input.Wrapper>
		</div>
	);
}
