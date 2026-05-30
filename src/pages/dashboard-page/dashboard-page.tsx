import { RemindListBoundary } from '@/features/remind/manage-reminds';
import { StocksListBoundary } from '@/pages/stocks-page/ui/stocks-list/stocks-list';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { DashboardNotesBoundary } from '@/widgets/dashboard-notes';
import { DashboardSignals } from '@/widgets/dashboard-signals';
import { DashboardStatisticsBoundary } from '@/widgets/dashboard-statistics';
import { StrategiesListBoundary } from '@/widgets/strategies-overview/ui/strategies-list';

export function DashboardPage() {
	return (
		<>
			<PageHeader title='Главная' description='Краткая сводка по ключевым показателям портфеля, сигналам и инструментам' />

			<Section header={{ title: 'Общая статистика' }}>
				<DashboardStatisticsBoundary />
			</Section>

			<Section header={{ title: 'Последние сигналы' }}>
				<DashboardSignals />
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
