import { Stack } from '@mantine/core';
import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';
import type { SignalFilters } from '@/pages/signals/ui/filter-signals';
import type { SignalDirection, SignalSortField } from '@/shared/api';

import {
	mapSignalResponsePageToSignals,
	SignalsList,
	SignalsListSkeleton,
	useGetLatestSignalsSuspense,
} from '@/entities/signal';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { SignalsOverviewStatusBar } from './signals-overview-status-bar';

const SIGNALS_PAGE_SIZE = 20;

export type SignalsOverviewListProps = {
	filters: SignalFilters;
	onPageChange: (page: number) => void;
	onResetFilters: () => void;
	onSignalSelect: (signal: Signal) => void;
};

function SignalsOverviewList({ filters, onPageChange, onResetFilters, onSignalSelect }: SignalsOverviewListProps) {
	const { data: signalsData } = useGetLatestSignalsSuspense({
		direction: getSignalDirection(filters.directionFilter),
		sortBy: [getSignalSortField(filters.sortOption)],
		page: filters.page,
		pageSize: SIGNALS_PAGE_SIZE,
	}, {
		query: {
			refetchInterval: QUERY_REFETCH_INTERVAL,
		},
	});

	const signals = useMemo(
		() => mapSignalResponsePageToSignals(signalsData.data),
		[signalsData.data],
	);
	const buyCount = signals.filter((signal) => signal.direction === 'buy').length;
	const sellCount = signals.filter((signal) => signal.direction === 'sell').length;

	return (
		<DataState
			hasData={signalsData.data.totalCount > 0}
			hasResults={signals.length > 0}
			onResetFilters={onResetFilters}
		>
			<Stack gap='md'>
				<SignalsOverviewStatusBar
					totalCount={signalsData.data.totalCount}
					filteredCount={signals.length}
					pagination={{
						page: signalsData.data.page,
						pageSize: signalsData.data.pageSize,
						totalPages: signalsData.data.totalPages,
						onPageChange,
					}}
					showDirectionBadges={filters.directionFilter === 'all'}
					buyCount={buyCount}
					sellCount={sellCount}
				/>
				<SignalsList signals={signals} onSignalSelect={onSignalSelect} />
			</Stack>
		</DataState>
	);
}

function getSignalDirection(direction: SignalFilters['directionFilter']): SignalDirection | undefined {
	if (direction === 'buy')
		return 'BUY';
	if (direction === 'sell')
		return 'SELL';
	return undefined;
}

function getSignalSortField(sortOption: SignalFilters['sortOption']): SignalSortField {
	const sortFields: Record<SignalFilters['sortOption'], SignalSortField> = {
		'date-desc': 'signalDateDesc',
		'date-asc': 'signalDateAsc',
		'asset-asc': 'symbolAsc',
		'asset-desc': 'symbolDesc',
		'confidence-asc': 'accuracyAsc',
		'confidence-desc': 'accuracyDesc',
	};

	return sortFields[sortOption];
}

export const SignalsOverviewListBoundary = withQueryBoundary(SignalsOverviewList, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
