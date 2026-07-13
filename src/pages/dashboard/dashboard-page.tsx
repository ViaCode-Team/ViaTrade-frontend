import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { DashboardNotesBoundary } from '@/pages/dashboard/ui/dashboard-notes';
import { DashboardRemindsBoundary } from '@/pages/dashboard/ui/dashboard-reminds';
import { DashboardSignalsBoundary } from '@/pages/dashboard/ui/dashboard-signals';
import { DashboardStatisticsBoundary } from '@/pages/dashboard/ui/dashboard-statistics';
import { DashboardStrategiesBoundary } from '@/pages/dashboard/ui/dashboard-strategies';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { SignalHistoryTableBoundary } from '@/widgets/signal-history-table';

function openSignalHistoryModal(signal: Signal) {
	modals.open({
		title: `История сигнала: ${signal.asset}`,
		children: (
			<SignalHistoryTableBoundary
				tradeCode={signal.tradeCode}
				strategyName={signal.strategy}
			/>
		),
	});
}

export function DashboardPage() {
	return (
		<>
			<PageHeader
				title='Главная'
				description='Сводка по портфелю, сигналам и инструментам'
				rightSection={<DataFreshness />}
			/>

			<Section>
				<DashboardStatisticsBoundary />
			</Section>

			<Section header={{ title: 'Последние сигналы' }}>
				<DashboardSignalsBoundary onSignalSelect={openSignalHistoryModal} />
			</Section>

			<Section header={{ title: 'Активные стратегии' }}>
				<DashboardStrategiesBoundary />
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
