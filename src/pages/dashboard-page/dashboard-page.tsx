import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { DashboardNotesBoundary } from '@/pages/dashboard-page/ui/dashboard-notes';
import { DashboardRemindsBoundary } from '@/pages/dashboard-page/ui/dashboard-reminds';
import { DashboardSignalsBoundary } from '@/pages/dashboard-page/ui/dashboard-signals';
import { DashboardStatisticsBoundary } from '@/pages/dashboard-page/ui/dashboard-statistics';
import { DashboardStocksBoundary } from '@/pages/dashboard-page/ui/dashboard-stocks';
import { DashboardStrategiesBoundary } from '@/pages/dashboard-page/ui/dashboard-strategies';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { HistoryTableBoundary } from '@/widgets/signal-history-table';

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

			<Section>
				<DashboardStatisticsBoundary />
			</Section>

			<Section header={{ title: 'Последние сигналы' }}>
				<DashboardSignalsBoundary onSignalSelect={openSignalHistoryModal} />
			</Section>

			<Section header={{ title: 'Активные стратегии' }}>
				<DashboardStrategiesBoundary />
			</Section>

			<Section header={{ title: 'Лучшие акции' }}>
				<DashboardStocksBoundary onLinkedStrategiesClick={() => {}} />
			</Section>

			<Section header={{ title: 'Последние напоминания' }}>
				<DashboardRemindsBoundary />
			</Section>

			<Section header={{ title: 'Последние заметки' }}>
				<DashboardNotesBoundary />
			</Section>
		</>
	);
}
