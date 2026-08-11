import { DashboardNotesBoundary } from '@/pages/dashboard/ui/dashboard-notes';
import { DashboardRemindsBoundary } from '@/pages/dashboard/ui/dashboard-reminds';
import { DashboardSignalsBoundary } from '@/pages/dashboard/ui/dashboard-signals';
import { DashboardStatisticsBoundary } from '@/pages/dashboard/ui/dashboard-statistics';
import { DashboardStrategiesBoundary } from '@/pages/dashboard/ui/dashboard-strategies';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { openSignalHistoryModal } from '@/widgets/signal-history-table';

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

			<Section header={{ title: 'Подписанные стратегии' }}>
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
