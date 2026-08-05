import { BarChart } from '@mantine/charts';
import { Card, Flex, Text, Title } from '@mantine/core';
import { useMemo } from 'react';

import { useGetProfitChartSuspense, useGetTradeDateRangeSuspense } from '@/entities/trade';
import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import type { ProfitChartSettings } from '../../../model/profit-chart-settings';

import {
	formatProfitChartPercentage,
	getDirectionPerformanceChartData,
} from '../../../model/statistics';
import { useProfitChartSettings } from '../../../model/use-profit-chart-settings';
import { StatisticsChartCardSkeleton } from './overview-chart-card.skeleton';
import cls from './statistics-charts.module.css';

const DirectionPerformanceChartDataBoundary = withQueryBoundary(DirectionPerformanceChartData, {
	suspenseProps: {
		fallback: <StatisticsChartCardSkeleton />,
	},
});

export function DirectionPerformanceChartCard() {
	const { data: dateRangeResponse } = useGetTradeDateRangeSuspense();
	const { settings, hasDateRange } = useProfitChartSettings(dateRangeResponse.data);

	if (!hasDateRange) {
		return <DirectionPerformanceChartFrame><AppEmptyState title='Нет данных' /></DirectionPerformanceChartFrame>;
	}

	return <DirectionPerformanceChartDataBoundary settings={settings} />;
}

function DirectionPerformanceChartData({ settings }: { settings: ProfitChartSettings }) {
	const { data: bucketsResponse } = useGetProfitChartSuspense(settings);
	const buckets = bucketsResponse.data;
	const data = useMemo(
		() => getDirectionPerformanceChartData(buckets),
		[buckets],
	);

	return (
		<DirectionPerformanceChartFrame>
			<BarChart
				h={300}
				data={data}
				dataKey='direction'
				series={[{ name: 'Сумма', label: 'Результат', color: 'cyan.6' }]}
				valueFormatter={formatProfitChartPercentage}
				withBarValueLabel
			/>
		</DirectionPerformanceChartFrame>
	);
}

function DirectionPerformanceChartFrame({ children }: { children: React.ReactNode }) {
	return (
		<Card withBorder className={cls.chartCard}>
			<Flex direction='column'>
				<Title order={4}>Long / Short</Title>
				<Text size='sm' c='dimmed'>Суммарный результат направлений за выбранный период</Text>
			</Flex>

			{children}
		</Card>
	);
}

export const DirectionPerformanceChartCardBoundary = withQueryBoundary(DirectionPerformanceChartCard, {
	suspenseProps: {
		fallback: <StatisticsChartCardSkeleton />,
	},
});
