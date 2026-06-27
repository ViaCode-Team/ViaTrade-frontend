import { AreaChart, BarChart, DonutChart } from '@mantine/charts';
import { Card, Flex, Text, Title } from '@mantine/core';

import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import cls from './statistics-dashboard.module.css';
import { StatisticsDashboardSkeleton } from './statistics-dashboard.skeleton';
import { useStatisticsDashboard } from './utils/use-statistics-dashboard';

export function StatisticsDashboard() {
	const { totalTrades, pnlData, winLossData, barData } = useStatisticsDashboard();

	if (totalTrades === 0) {
		return <AppEmptyState title='Статистика недоступна' description='Добавьте сделки, чтобы увидеть статистику.' />;
	}

	return (
		<div className={cls.root}>

			<div className={cls.chartsGrid}>
				<Card withBorder className={cls.chartCard}>
					<Flex direction='column'>
						<Title order={4}>Накопительная прибыль</Title>
						<Text size='sm' c='dimmed'>Ваша прибыль и убытки с течением времени</Text>
					</Flex>

					<AreaChart
						h={300}
						data={pnlData}
						dataKey='date'
						series={[{ name: 'Сумма', color: 'indigo.6' }]}
						curveType='monotone'
					/>
				</Card>

				<Card withBorder className={cls.chartCard}>
					<Flex direction='column'>
						<Title order={4}>Соотношение Прибыль / Убыток</Title>
						<Text size='sm' c='dimmed'>Прибыльные и убыточные сделки</Text>
					</Flex>

					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
						<Title order={4}>Сделки по типам</Title>
						<Text size='sm' c='dimmed'>Распределение типов сделок (Long/Short)</Text>
					</Flex>

					<BarChart
						h={300}
						data={barData}
						dataKey='type'
						series={[{ name: 'Count', color: 'blue.6' }]}
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
