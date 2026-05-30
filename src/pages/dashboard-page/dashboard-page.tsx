import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { RemindListBoundary } from '@/features/remind/manage-reminds';
import { StocksListBoundary } from '@/pages/stocks-page/ui/stocks-list/stocks-list';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { DashboardStatisticsBoundary } from '@/widgets/dashboard-statistics';
import { HistoryTableBoundary } from '@/widgets/signal-history-table';
import { SignalsListBoundary } from '@/widgets/signals-list';
import { StrategiesListBoundary } from '@/widgets/strategies-overview/ui/strategies-list';

import { DashboardNotesBoundary } from './ui/dashboard-notes';

export function DashboardPage() {
	function openSignalHistoryModal(signal: Signal) {
		modals.open({
			title: `История сигнала: ${signal.asset}`,
			size: 'md',
			children: (
				<HistoryTableBoundary
					tradeCode={signal.tradeCode}
					strategyName={signal.strategy}
				/>
			),
		});
	}

	return (
		<>
			<PageHeader title='Главная' description='Сводка по портфелю, сигналам и инструментам' />

			<Section header={{ title: 'Общая статистика' }}>
				<DashboardStatisticsBoundary />
			</Section>

			<Section header={{ title: 'Последние сигналы' }}>
				<SignalsListBoundary limit={4} onSignalSelect={openSignalHistoryModal} />
			</Section>

			<Section header={{ title: 'Активные стратегии' }}>
				<StrategiesListBoundary limit={4} onlyActive={true} />
			</Section>

			<Section header={{ title: 'Лучшие акции' }}>
				<StocksListBoundary
					searchQuery=''
					sortOption='name-asc'
					trendFilter='all'
					limit={4}
					onLinkedStrategiesClick={() => {}}
				/>
			</Section>

			<Section header={{ title: 'Последние напоминания' }}>
				<RemindListBoundary limit={4} />
			</Section>

			<Section header={{ title: 'Последние заметки' }}>
				<DashboardNotesBoundary />
			</Section>
		</>
	);
}
