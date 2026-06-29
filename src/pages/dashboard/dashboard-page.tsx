import { modals } from '@mantine/modals';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';

import type { Signal } from '@/entities/signal';

import { DashboardNotesBoundary } from '@/pages/dashboard/ui/dashboard-notes';
import { DashboardRemindsBoundary } from '@/pages/dashboard/ui/dashboard-reminds';
import { DashboardSignalsBoundary } from '@/pages/dashboard/ui/dashboard-signals';
import { DashboardStatisticsBoundary } from '@/pages/dashboard/ui/dashboard-statistics';
import { DashboardStrategiesBoundary } from '@/pages/dashboard/ui/dashboard-strategies';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

const { HistoryTableBoundary } = lazily(() => import('@/widgets/signal-history-table'));

export function DashboardPage() {
	function openSignalHistoryModal(signal: Signal) {
		modals.open({
			title: `История сигнала: ${signal.asset}`,
			size: 'md',
			children: (
				<Suspense fallback={null}>
					<HistoryTableBoundary
						tradeCode={signal.tradeCode}
						strategyName={signal.strategy}
					/>
				</Suspense>
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

			<Section header={{ title: 'Последние напоминания' }}>
				<DashboardRemindsBoundary />
			</Section>

			<Section header={{ title: 'Последние заметки' }}>
				<DashboardNotesBoundary />
			</Section>
		</>
	);
}
