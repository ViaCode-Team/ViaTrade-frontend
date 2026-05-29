import { SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Signal } from '@/entities/signal';

import { mockSignals, SignalCard } from '@/entities/signal';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { HistoryTableBoundary } from '@/widgets/signal-history-table';

export function DashboardSignals() {
	// Taking the first 4 signals for a compact dashboard view
	const recentSignals = mockSignals.slice(0, 4);

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
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			{recentSignals.map((signal) => (
				<SignalCard
					key={signal.id}
					signal={signal}
					onClick={openSignalHistoryModal}
				/>
			))}
		</SimpleGrid>
	);
}
