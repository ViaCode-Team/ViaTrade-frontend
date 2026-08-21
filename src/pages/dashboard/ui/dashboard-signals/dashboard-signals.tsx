import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';

import {
	mapSignalResponsePageToSignals,
	SignalsList,
	SignalsListSkeleton,
	useGetLatestSignalsSuspense,
} from '@/entities/signal';
import { STATIC_QUERY_STALE_TIME } from '@/shared/model';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

export function DashboardSignals({ onSignalSelect }: { onSignalSelect: (signal: Signal) => void }) {
	const { data: signalsData } = useGetLatestSignalsSuspense(undefined, {
		query: {
			staleTime: STATIC_QUERY_STALE_TIME,
		},
	});
	const signals = useMemo(
		() => mapSignalResponsePageToSignals(signalsData.data),
		[signalsData.data],
	);

	const resultsSignals = signals.slice(0, 4);

	return (
		<DataState hasData={!!resultsSignals.length}>
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
