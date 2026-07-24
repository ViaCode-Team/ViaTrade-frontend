import { Stack } from '@mantine/core';

import type { Signal } from '@/entities/signal';

import { SignalsControls, useSignalsControls } from '@/pages/signals/ui/filter-signals';

import { SignalsOverviewListBoundary } from './signals-overview-list';

export function SignalsOverview({ onSignalSelect }: { onSignalSelect: (signal: Signal) => void }) {
	const { filters, resetFilters } = useSignalsControls();

	return (
		<Stack>
			<SignalsControls />

			<SignalsOverviewListBoundary
				filters={filters}
				onResetFilters={resetFilters}
				onSignalSelect={onSignalSelect}
			/>
		</Stack>
	);
}
