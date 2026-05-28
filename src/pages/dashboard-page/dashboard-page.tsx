import { Flex, SimpleGrid } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { PageHeader } from '@/shared/ui/page-header';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { mockSignals, mockStats } from './model/dashboard-data';
import { DashboardSignalCard } from './ui/dashboard-signal-card';

export function DashboardPage() {
	return (
		<>
			<PageHeader title='Панель управления' />

			<SummaryList>
				<SummaryCard
					title='Всего сделок'
					value={mockStats.totalTrades}
					description={`Прибыльных: ${mockStats.profitableTrades} | Убыточных: ${mockStats.losingTrades}`}
				/>
				<SummaryCard
					title='Общая прибыль'
					value={`${mockStats.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })} ₽`}
					description={`Средняя: ${mockStats.averageProfit.toFixed(2)} ₽`}
				/>
				<SummaryCard
					title='Win Rate'
					value={`${mockStats.winRate.toFixed(1)}%`}
					description={`Profit Factor: ${mockStats.profitFactor}`}
				/>
				<SummaryCard
					title='Среднее время на сделку'
					value={mockStats.averageHoldTime}
				/>
			</SummaryList>

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
