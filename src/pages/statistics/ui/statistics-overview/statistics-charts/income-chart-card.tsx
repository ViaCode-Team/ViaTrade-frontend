import { BarChart } from '@mantine/charts';
import { Card, Flex, Text, Title } from '@mantine/core';
import { useMemo } from 'react';

import { useGetTradeStatisticsSuspense } from '@/entities/trade';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import {
	formatChartCurrency,
	formatProfitFactor,
	getIncomeChartData,
} from '../../../model/statistics';
import { StatisticsChartCardSkeleton } from './overview-chart-card.skeleton';
import cls from './statistics-charts.module.css';

export function IncomeChartCard() {
	const { data: statisticsResponse } = useGetTradeStatisticsSuspense();
	const {
		incomeStatistic,
		winrateStatistic,
	} = statisticsResponse.data;
	const data = useMemo(
		() => getIncomeChartData(incomeStatistic),
		[incomeStatistic],
	);

	return (
		<Card withBorder className={cls.chartCard}>
			<Flex direction='column'>
				<Title order={4}>Доходность</Title>
				<Text size='sm' c='dimmed'>
					Profit Factor:
					{' '}
					{formatProfitFactor(winrateStatistic.profitFactor)}
				</Text>
			</Flex>

			<BarChart
				h={300}
				data={data}
				dataKey='metric'
				series={[{ name: 'value', label: 'Значение', color: 'blue.6' }]}
				valueFormatter={formatChartCurrency}
			/>
		</Card>
	);
}

export const IncomeChartCardBoundary = withQueryBoundary(IncomeChartCard, {
	suspenseProps: {
		fallback: <StatisticsChartCardSkeleton />,
	},
});
