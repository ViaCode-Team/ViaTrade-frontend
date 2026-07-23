import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';
import type { SignalFilters } from '@/pages/signals/ui/filter-signals';

import {
	mapStrategyResultResponseToSignals,
	SignalsList,
	SignalsListSkeleton,
	useGetStrategyResultsSuspense,
} from '@/entities/signal';
import { getFilteredSignals, getSignalRequestParams } from '@/pages/signals/ui/filter-signals';
import {
	QUERY_REFETCH_INTERVAL,
} from '@/shared/model';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

export type SignalsOverviewListProps = {
	filters: SignalFilters;
	onSignalSelect: (signal: Signal) => void;
};

function SignalsOverviewList({ filters, onSignalSelect }: SignalsOverviewListProps) {
	const { data: signalsData } = useGetStrategyResultsSuspense(getSignalRequestParams(filters.sortOption), {
		query: {
			refetchInterval: QUERY_REFETCH_INTERVAL,
		},
	});

	const signals = useMemo(
		() => mapStrategyResultResponseToSignals(signalsData.data),
		[signalsData.data],
	);

	const filteredAndSortedSignals = useMemo(() => {
		const filtered = filters ? getFilteredSignals(signals, filters) : signals;
		return filtered;
	}, [signals, filters]);

	return (
		<DataState
			hasData={!!signals.length}
			hasResults={!!filteredAndSortedSignals.length}
		>
			<SignalsList
				signals={filteredAndSortedSignals}
				onSignalSelect={onSignalSelect}
			/>
		</DataState>
	);
}

export const SignalsOverviewListBoundary = withQueryBoundary(SignalsOverviewList, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
