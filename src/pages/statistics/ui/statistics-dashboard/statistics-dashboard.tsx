import '@mantine/charts/styles.css';
import { BarChart, DonutChart } from '@mantine/charts';
import { Card, Flex, Text, Title } from '@mantine/core';

import { useGetTradeStatisticsSuspense } from '@/entities/trade';
import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import cls from './statistics-dashboard.module.css';
import { StatisticsDashboardSkeleton } from './statistics-dashboard.skeleton';

export function StatisticsDashboard() {
	const { data: response } = useGetTradeStatisticsSuspense();
	const {
		incomeStatistic,
		tradeStatistic,
		winrateStatistic,
	} = response.data;

	const winLossData = [
		{ name: 'Прибыльные', value: tradeStatistic.winTrades, color: 'teal.6' },
		{ name: 'Убыточные', value: tradeStatistic.loseTrades, color: 'red.6' },
	];

	const incomeData = [
		{ metric: 'Общая прибыль', value: incomeStatistic.totalIncome },
		{ metric: 'Средняя прибыль', value: incomeStatistic.averageIncome },
	];

	if (tradeStatistic.totalTrades === 0) {
		return (
			<AppEmptyState
				title='Статистика недоступна'
				description='Добавьте сделки, чтобы увидеть статистику.'
			/>
		);
	}

	return (
		<div className={cls.root}>
			<div className={cls.chartsGrid}>
				<Card withBorder className={cls.chartCard}>
					<Flex direction='column'>
						<Title order={4}>Соотношение Прибыль / Убыток</Title>
						<Text size='sm' c='dimmed'>Количество прибыльных и убыточных сделок</Text>
					</Flex>

					<div className={cls.donutContainer}>
						<DonutChart
							h={250}
							data={winLossData}
							withLabelsLine
							withLabels
							tooltipDataSource='segment'
						/>
					</div>
				</Card>

				<Card withBorder className={cls.chartCard}>
					<Flex direction='column'>
						<Title order={4}>Доходность</Title>
						<Text size='sm' c='dimmed'>
							Profit Factor:
							{' '}
							{winrateStatistic.profitFactor}
						</Text>
					</Flex>

					<BarChart
						h={300}
						data={incomeData}
						dataKey='metric'
						series={[{ name: 'value', label: 'Значение', color: 'blue.6' }]}
					/>
				</Card>
			</div>
		</div>
	);
}

export const StatisticsDashboardBoundary = withQueryBoundary(StatisticsDashboard, {
	suspenseProps: {
		fallback: <StatisticsDashboardSkeleton />,
	},
});
