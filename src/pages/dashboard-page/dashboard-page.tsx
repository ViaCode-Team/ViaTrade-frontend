import {
	Flex,
	SimpleGrid,
	Title,
} from '@mantine/core';
import {
	IconBuildingBank,
	IconClock,
	IconCurrencyDollar,
	IconPercentage,
} from '@tabler/icons-react';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import { mockSignals, mockStats } from './model/dashboard-data';
import { DashboardSignalCard } from './ui/dashboard-signal-card';
import { StatCard } from './ui/stat-card';

export function DashboardPage() {
	return (
		<>
			<Title order={1}>
				Панель управления
			</Title>

			<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={CONTENT_GRID_SPACING}>
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

			<Flex direction='column' gap='lg'>
				<SimpleGrid cols={{ base: 1, md: 2 }} spacing={CONTENT_GRID_SPACING}>
					{mockSignals.map((signal) => (
						<DashboardSignalCard key={signal.id} signal={signal} />
					))}
				</SimpleGrid>
			</Flex>
		</>
	);
}
