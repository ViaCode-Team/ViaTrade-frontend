import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { DashboardNotesWidgetBoundary } from '@/widgets/dashboard-notes-widget';
import { DashboardRemindsWidgetBoundary } from '@/widgets/dashboard-reminds-widget';
import { DashboardSignalsWidgetBoundary } from '@/widgets/dashboard-signals-widget';
import { DashboardStatisticsBoundary } from '@/widgets/dashboard-statistics';
import { DashboardStocksWidgetBoundary } from '@/widgets/dashboard-stocks-widget';
import { DashboardStrategiesWidgetBoundary } from '@/widgets/dashboard-strategies-widget';
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
				<DashboardSignalsWidgetBoundary onSignalSelect={openSignalHistoryModal} />
			</Section>

			<Section header={{ title: 'Активные стратегии' }}>
				<DashboardStrategiesWidgetBoundary />
			</Section>

			<Section header={{ title: 'Лучшие акции' }}>
				<DashboardStocksWidgetBoundary onLinkedStrategiesClick={() => {}} />
			</Section>

			<Section header={{ title: 'Последние напоминания' }}>
				<DashboardRemindsWidgetBoundary />
			</Section>

			<Section header={{ title: 'Последние заметки' }}>
				<DashboardNotesWidgetBoundary />
			</Section>
		</>
	);
}
