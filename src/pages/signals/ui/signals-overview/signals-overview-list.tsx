import { Stack } from '@mantine/core';
import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';
import type { SignalFilters } from '@/pages/signals/ui/filter-signals';
import type { SignalSortField, TradeSignal } from '@/shared/api';

import {
	mapSignalResponsePageToSignals,
	SignalsList,
	SignalsListSkeleton,
	useGetLatestSignalsSuspense,
} from '@/entities/signal';
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
		signals: getTradeSignals(filters.signalsFilter),
		sortBy: [getSignalSortField(filters.sortOption)],
		page: filters.page,
		pageSize: SIGNALS_PAGE_SIZE,
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
			<Stack>
				<SignalsOverviewStatusBar
					totalCount={signalsData.data.totalCount}
					filteredCount={signals.length}
					pagination={{
						page: signalsData.data.page,
						pageSize: signalsData.data.pageSize,
						totalPages: signalsData.data.totalPages,
						onPageChange,
					}}
					showDirectionBadges={filters.signalsFilter.length === 3 || filters.signalsFilter.length === 0}
					buyCount={buyCount}
					sellCount={sellCount}
				/>

				<SignalsList
					signals={signals}
					onSignalSelect={onSignalSelect}
				/>
			</Stack>
		</DataState>
	);
}

function getTradeSignals(signalsFilter: SignalFilters['signalsFilter']): TradeSignal[] | undefined {
	if (!signalsFilter || signalsFilter.length === 0 || signalsFilter.length === 3) {
		return undefined;
	}

	const mapping: Record<string, TradeSignal> = {
		buy: 1,
		sell: -1,
		hold: 0,
	};

	return signalsFilter.map((f) => mapping[f]);
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
