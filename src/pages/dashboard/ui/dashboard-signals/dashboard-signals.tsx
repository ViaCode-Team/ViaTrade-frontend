import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';

import {
	mapStrategyResultResponseToSignals,
	SignalsList,
	SignalsListSkeleton,
	useGetResultSuspense,
} from '@/entities/signal';
import {
	QUERY_REFETCH_INTERVAL,
	STATIC_QUERY_STALE_TIME,
} from '@/shared/model';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

export function DashboardSignals({ onSignalSelect }: { onSignalSelect: (signal: Signal) => void }) {
	const { data: signalsData } = useGetResultSuspense(undefined, {
		query: {
			staleTime: STATIC_QUERY_STALE_TIME,
			refetchInterval: QUERY_REFETCH_INTERVAL,
		},
	});
	const signals = useMemo(
		() => mapStrategyResultResponseToSignals(signalsData.data),
		[signalsData.data],
	);

	const resultsSignals = signals.slice(0, 4);

	return (
		<DataState
			hasData={signals.length > 0}
			hasResults={resultsSignals.length > 0}
		>
			<SignalsList
				signals={resultsSignals}
				onSignalSelect={onSignalSelect}
			/>
		</DataState>
	);
}

export const DashboardSignalsBoundary = withQueryBoundary(DashboardSignals, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
