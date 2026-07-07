import { BarChart } from '@mantine/charts';
import { Card, Flex, Text, Title } from '@mantine/core';
import { useMemo } from 'react';

import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import {
	formatChartCurrency,
	getDirectionPerformanceChartData,
} from '../../model/statistics-dashboard';
import { useProfitChartData } from '../../model/use-profit-chart-data';
import { OverviewChartCardSkeleton } from './overview-chart-card.skeleton';
import cls from './statistics-dashboard.module.css';

export function DirectionPerformanceChartCard() {
	const { trades } = useProfitChartData();
	const data = useMemo(
		() => getDirectionPerformanceChartData(trades),
		[trades],
	);

	return (
		<Card withBorder className={cls.chartCard}>
			<Flex direction='column'>
				<Title order={4}>Long / Short</Title>
				<Text size='sm' c='dimmed'>Суммарный результат направлений за выбранный период</Text>
			</Flex>

			<BarChart
				h={300}
				data={data}
				dataKey='direction'
				series={[{ name: 'Сумма', label: 'Результат', color: 'cyan.6' }]}
				valueFormatter={formatChartCurrency}
				withBarValueLabel
			/>
		</Card>
	);
}

export const DirectionPerformanceChartCardBoundary = withQueryBoundary(DirectionPerformanceChartCard, {
	suspenseProps: {
		fallback: <OverviewChartCardSkeleton />,
	},
});
