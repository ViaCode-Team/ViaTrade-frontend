import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { SignalHistoryTableBoundary } from './history-table';

export function openSignalHistoryModal(signal: Signal) {
	modals.open({
		title: `История сигнала: ${signal.asset}`,
		children: (
			<SignalHistoryTableBoundary
				instrumentId={signal.instrumentId}
				strategyId={signal.strategyId}
				strategyName={signal.strategy}
			/>
		),
	});
}
