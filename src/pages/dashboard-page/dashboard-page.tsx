import {
	Group,
	Paper,
	SimpleGrid,
	Title,
} from '@mantine/core';
import {
	IconBuildingBank,
	IconChartLine,
	IconClock,
	IconCurrencyDollar,
	IconPercentage,
} from '@tabler/icons-react';

import { mockSignals, mockStats } from './model/dashboard-data';
import { DashboardSignalCard } from './ui/dashboard-signal-card';
import { StatCard } from './ui/stat-card';

export function DashboardPage() {
	return (
		<>
			<Title order={2} fw='bold' mb='sm'>
				Панель управления
			</Title>
			<Title order={4} mt='lg' mb='sm'>
				Статистика сделок
			</Title>
			<SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='lg' mb='xl'>
				<StatCard
					icon={<IconBuildingBank size={22} />}
					title='Всего сделок'
					value={mockStats.totalTrades}
					subtitle={`Прибыльных: ${mockStats.profitableTrades} | Убыточных: ${mockStats.losingTrades}`}
				/>
				<StatCard
					icon={<IconCurrencyDollar size={22} />}
					title='Общая прибыль'
					value={`$${mockStats.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
					subtitle={`Средняя: $${mockStats.averageProfit.toFixed(2)}`}
				/>
				<StatCard
					icon={<IconPercentage size={22} />}
					title='Win Rate'
					value={`${mockStats.winRate.toFixed(1)}%`}
					subtitle={`Profit Factor: ${mockStats.profitFactor}`}
				/>
				<StatCard
					icon={<IconClock size={22} />}
					title='Среднее время'
					value={mockStats.averageHoldTime}
					subtitle='на сделку'
				/>
			</SimpleGrid>
			<Title order={4} mb='sm'>
				<Group gap='xs'>
					<IconChartLine size={20} />
					Сигналы от стратегий
				</Group>
			</Title>
			<Paper p='sm' withBorder>
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='sm'>
					{mockSignals.map((signal) => (
						<DashboardSignalCard key={signal.id} signal={signal} />
					))}
				</SimpleGrid>
			</Paper>
		</>
	);
}
