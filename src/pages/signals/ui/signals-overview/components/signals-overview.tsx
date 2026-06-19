import { Stack } from '@mantine/core';

import type { Signal } from '@/entities/signal';

import { useGetResult } from '@/entities/signal';
import { SignalsControls, useSignalsControls } from '@/pages/signals/ui/filter-signals';

import { SignalsOverviewListBoundary } from './signals-overview-list';
import { SignalsStatusBarBoundary } from './signals-status-bar';

export function SignalsOverview({ onSignalSelect }: { onSignalSelect: (signal: Signal) => void }) {
	const { filters } = useSignalsControls();
	const { data, isLoading } = useGetResult(undefined, {
		query: {
			staleTime: Infinity,
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
