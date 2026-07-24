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
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

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
				<ListStatusBar
					totalCount={signals.length}
					filteredCount={filteredAndSortedSignals.length}
					badges={(
						<>
							{filters.directionFilter === 'all' && buyCount > 0 && (
								<ValueBadge variant='dot' color='green' size='sm' label='Покупать' value={buyCount} />
							)}
							{filters.directionFilter === 'all' && sellCount > 0 && (
								<ValueBadge variant='dot' color='red' size='sm' label='Продавать' value={sellCount} />
							)}
						</>
					)}
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
