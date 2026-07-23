import { Stack } from '@mantine/core';

import type { Signal } from '@/entities/signal';

import { useGetStrategyResults } from '@/entities/signal';
import { SignalsControls, useSignalsControls } from '@/pages/signals/ui/filter-signals';
import { getSignalRequestParams } from '@/pages/signals/ui/filter-signals';
import { STATIC_QUERY_STALE_TIME } from '@/shared/model';

import { SignalsOverviewListBoundary } from './signals-overview-list';
import { SignalsStatusBarBoundary } from './signals-status-bar';

export function SignalsOverview({ onSignalSelect }: { onSignalSelect: (signal: Signal) => void }) {
	const { filters } = useSignalsControls();
	const { data, isLoading } = useGetStrategyResults(getSignalRequestParams(filters.sortOption), {
		query: {
			staleTime: STATIC_QUERY_STALE_TIME,
		},
	});

	const disabled = isLoading || !data?.data?.strategies?.length;

	return (
		<Stack>
			<Stack gap='xs'>
				<SignalsControls
					disabled={disabled}
					isLoading={isLoading}
				/>

				<SignalsStatusBarBoundary />
			</Stack>

			<SignalsOverviewListBoundary
				filters={filters}
				onSignalSelect={onSignalSelect}
			/>
		</Stack>
	);
}
