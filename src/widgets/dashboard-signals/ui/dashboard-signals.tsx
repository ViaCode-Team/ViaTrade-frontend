import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { SignalsListBoundary } from '@/pages/signals-page/ui/signals-list';
import { HistoryTableBoundary } from '@/widgets/signal-history-table';

export function DashboardSignals() {
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
		<SignalsListBoundary
			limit={4}
			onSignalSelect={openSignalHistoryModal}
		/>
	);
}
