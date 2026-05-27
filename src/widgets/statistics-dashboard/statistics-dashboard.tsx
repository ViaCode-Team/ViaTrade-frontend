import { AreaChart, BarChart, DonutChart } from '@mantine/charts';
import { Card, Text, Title } from '@mantine/core';

import { EmptyState } from '@/shared/ui/empty-state';

import { useStatisticsDashboard } from './lib/use-statistics-dashboard';
import cls from './statistics-dashboard.module.css';

export function StatisticsDashboard() {
	const { totalTrades, pnlData, winLossData, barData } = useStatisticsDashboard();

	if (totalTrades === 0) {
		return <EmptyState title='Статистика недоступна' description='Добавьте сделки, чтобы увидеть статистику.' />;
	}

	return (
		<div className={cls.root}>

			<div className={cls.chartsGrid}>
				<Card withBorder className={cls.chartCard}>
					<Title order={4}>Накопительная прибыль</Title>
					<Text size='sm' c='dimmed' mb='md'>Ваша прибыль и убытки с течением времени</Text>
					<AreaChart
						h={300}
						data={pnlData}
						dataKey='date'
						series={[{ name: 'PnL', color: 'indigo.6' }]}
						curveType='monotone'
					/>
				</Card>

				<Card withBorder className={cls.chartCard}>
					<Title order={4}>Соотношение Прибыль / Убыток</Title>
					<Text size='sm' c='dimmed' mb='md'>Прибыльные и убыточные сделки</Text>
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
					<Title order={4}>Сделки по типам</Title>
					<Text size='sm' c='dimmed' mb='md'>Распределение типов сделок (Long/Short)</Text>
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
