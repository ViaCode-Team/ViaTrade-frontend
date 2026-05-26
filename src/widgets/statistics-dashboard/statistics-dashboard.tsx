import { AreaChart, BarChart, DonutChart } from '@mantine/charts';
import { Card, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';

import { useGetByUserSuspense } from '@/entities/statistic/api/gen';
import { mockTrades } from '@/entities/statistic/model/mock';
import { EmptyState } from '@/shared/ui/empty-state';

import cls from './statistics-dashboard.module.css';

export function StatisticsDashboard() {
	const { data } = useGetByUserSuspense();

	// Используем моковые данные, если с сервера пришел пустой массив (для проверки отображения)
	const trades = data.data.length === 0 ? mockTrades : data.data;

	const totalTrades = trades.length;

	if (totalTrades === 0) {
		return <EmptyState title='Статистика недоступна' description='Добавьте сделки, чтобы увидеть статистику.' />;
	}

	// Calculate metrics
	const profitableTrades = trades.filter((t) => (t.netIncome ?? 0) > 0).length;

	// PnL over time
	const sortedTrades = [...trades].sort((a, b) => dayjs(a.dateClose ?? a.dateOpen).valueOf() - dayjs(b.dateClose ?? b.dateOpen).valueOf());

	let cumulativePnL = 0;
	const pnlData = sortedTrades.map((t) => {
		cumulativePnL += t.netIncome ?? 0;
		return {
			date: dayjs(t.dateClose ?? t.dateOpen).format('MMM D, YYYY'),
			PnL: Number(cumulativePnL.toFixed(2)),
		};
	});

	// Win/Loss Donut
	const lossTrades = totalTrades - profitableTrades;
	const winLossData = [
		{ name: 'Прибыльные', value: profitableTrades, color: 'teal.6' },
		{ name: 'Убыточные', value: lossTrades, color: 'red.6' },
	];

	// Trades by Trade Type
	const tradesByType = trades.reduce<Record<number, number>>((acc, t) => {
		acc[t.tradeTypeId] = (acc[t.tradeTypeId] ?? 0) + 1;
		return acc;
	}, {});

	const barData = Object.entries(tradesByType).map(([typeId, count]) => ({
		type: typeId === '1' ? 'Long' : typeId === '2' ? 'Short' : `Тип ${typeId}`,
		Count: count,
	}));

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
