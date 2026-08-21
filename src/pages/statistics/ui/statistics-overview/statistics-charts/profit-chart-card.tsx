import { AreaChart } from '@mantine/charts';
import { Card, Flex, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { type ReactNode, useMemo } from 'react';

import { useGetProfitChartSuspense, useGetTradeDateRangeSuspense } from '@/entities/trade';
import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import type { ProfitChartSettings } from '../../../model/profit-chart-settings';

import { getProfitChartData } from '../../../model/profit-chart-settings';
import { formatProfitChartPercentage } from '../../../model/statistics';
import { useProfitChartSettings } from '../../../model/use-profit-chart-settings';
import { StatisticsChartCardSkeleton } from './overview-chart-card.skeleton';
import cls from './statistics-charts.module.css';

const ProfitChartDataBoundary = withQueryBoundary(ProfitChartData, {
	suspenseProps: {
		fallback: <StatisticsChartCardSkeleton height={360} className={cls.profitCard} />,
	},
});

export function ProfitChartCard() {
	const { data: dateRangeResponse } = useGetTradeDateRangeSuspense();
	const { settings, hasDateRange } = useProfitChartSettings(dateRangeResponse.data);

	if (!hasDateRange) {
		return <ProfitChartCardFrame><AppEmptyState title='Нет данных' /></ProfitChartCardFrame>;
	}

	return <ProfitChartDataBoundary settings={settings} />;
}

function ProfitChartData({ settings }: { settings: ProfitChartSettings }) {
	const { data: bucketsResponse } = useGetProfitChartSuspense(settings);
	const buckets = bucketsResponse.data;
	const data = useMemo(
		() => getProfitChartData(buckets, settings.granularity),
		[buckets, settings.granularity],
	);

	return (
		<ProfitChartCardFrame>
			{data.length > 0
				? (
						<AreaChart
							h={300}
							data={data}
							dataKey='date'
							series={[{ name: 'Сумма', color: 'indigo.6' }]}
							curveType='monotone'
							withBrush
							valueFormatter={formatProfitChartPercentage}
						/>
					)
				: (
						<AppEmptyState
							title='Нет данных за период'
							description='Измените начало, конец или период графика.'
						/>
					)}
		</ProfitChartCardFrame>
	);
}

function ProfitChartCardFrame({ children }: { children: ReactNode }) {
	return (
		<Card withBorder className={clsx(cls.chartCard, cls.profitCard)}>
			<Flex direction='column'>
				<Title order={4}>Прибыль</Title>
				<Text size='sm' c='dimmed'>Ваша прибыль и убытки с течением времени</Text>
			</Flex>

			{children}
		</Card>
	);
}

export const ProfitChartCardBoundary = withQueryBoundary(ProfitChartCard, {
	suspenseProps: {
		fallback: <StatisticsChartCardSkeleton height={360} className={cls.profitCard} />,
	},
});
