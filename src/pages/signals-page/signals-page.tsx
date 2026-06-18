import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { SignalsOverview } from '@/pages/signals-page/ui/signals-overview';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { HistoryTableBoundary } from '@/widgets/signal-history-table';

import { SignalsSummaryBoundary } from './ui/signals-summary';

export function SignalsPage() {
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
			<PageHeader
				title='Сигналы'
				description='Актуальные торговые сигналы по вашим стратегиям'
			/>

			<Section>
				<SignalsSummaryBoundary />
			</Section>

			<SignalsOverview onSignalSelect={openSignalHistoryModal} />
		</>
	);
}
