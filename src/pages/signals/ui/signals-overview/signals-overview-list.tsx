import { Stack } from '@mantine/core';
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

import { SignalsOverviewStatusBar } from './signals-overview-status-bar';

export type SignalsOverviewListProps = {
	filters: SignalFilters;
	onResetFilters: () => void;
	onSignalSelect: (signal: Signal) => void;
};

function SignalsOverviewList({ filters, onResetFilters, onSignalSelect }: SignalsOverviewListProps) {
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

	const buyCount = filteredAndSortedSignals.filter((signal) => signal.direction === 'buy').length;
	const sellCount = filteredAndSortedSignals.length - buyCount;

	return (
		<DataState
			hasData={!!signals.length}
			hasResults={!!filteredAndSortedSignals.length}
			onResetFilters={onResetFilters}
		>
			<Stack gap='md'>
				<SignalsOverviewStatusBar
					totalCount={signals.length}
					filteredCount={filteredAndSortedSignals.length}
					showDirectionBadges={filters.directionFilter === 'all'}
					buyCount={buyCount}
					sellCount={sellCount}
				/>
				<SignalsList
					signals={filteredAndSortedSignals}
					onSignalSelect={onSignalSelect}
				/>
			</Stack>
		</DataState>
	);
}

export const SignalsOverviewListBoundary = withQueryBoundary(SignalsOverviewList, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
