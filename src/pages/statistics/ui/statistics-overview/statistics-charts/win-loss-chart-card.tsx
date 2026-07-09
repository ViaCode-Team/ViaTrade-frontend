import { DonutChart } from '@mantine/charts';
import { Card, Flex, Text, Title } from '@mantine/core';
import { useMemo } from 'react';

import { useGetTradeStatisticsSuspense } from '@/entities/trade';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getWinLossChartData } from '../../../model/statistics';
import { StatisticsChartCardSkeleton } from './overview-chart-card.skeleton';
import cls from './statistics-charts.module.css';

export function WinLossChartCard() {
	const { data: statisticsResponse } = useGetTradeStatisticsSuspense();
	const data = useMemo(
		() => getWinLossChartData(statisticsResponse.data.tradeStatistic),
		[statisticsResponse.data.tradeStatistic],
	);

	return (
		<Card withBorder className={cls.chartCard}>
			<Flex direction='column'>
				<Title order={4}>Соотношение Прибыль / Убыток</Title>
				<Text size='sm' c='dimmed'>Количество прибыльных и убыточных сделок</Text>
			</Flex>

			<div className={cls.donutContainer}>
				<DonutChart
					h={250}
					data={data}
					withLabelsLine
					withLabels
					tooltipDataSource='segment'
				/>
			</div>
		</Card>
	);
}

export const WinLossChartCardBoundary = withQueryBoundary(WinLossChartCard, {
	suspenseProps: {
		fallback: <StatisticsChartCardSkeleton />,
	},
});
