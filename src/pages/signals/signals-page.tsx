import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { SignalsOverview } from '@/pages/signals/ui/signals-overview';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { SignalHistoryTableBoundary } from '@/widgets/signal-history-table';

import { SignalsSummaryBoundary } from './ui/signals-summary';

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

export function SignalsPage() {
	return (
		<>
			<PageHeader
				title='Сигналы'
				description='Актуальные торговые сигналы по вашим стратегиям'
				rightSection={<DataFreshness />}
			/>

			<Section>
				<SignalsSummaryBoundary />
			</Section>

			<SignalsOverview onSignalSelect={openSignalHistoryModal} />
		</>
	);
}
