import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo, useState } from 'react';

import type { Signal } from '@/entities/signal';

import {
	mapStrategyResultResponseToSignals,
	useGetResult,
} from '@/entities/signal';
import { PageHeader } from '@/shared/ui/page-header';

import type {
	DirectionFilter,
	SortOption,
} from './model/signal-filters';

import { getSignalResultsMock } from './api/signal-results.mock';
import { HistoryTableBoundary } from './ui/history-table';
import { SignalsFilters } from './ui/signals-filters';
import { SignalsListBoundary } from './ui/signals-list';
import { SignalsSummaryBoundary } from './ui/signals-summary';

export function SignalsPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState<SortOption>('date-desc');
	const [directionFilter, setDirectionFilter] = useState<DirectionFilter>('all');

	const filters = useMemo(
		() => ({
			searchQuery,
			sortOption,
			directionFilter,
		}),
		[searchQuery, sortOption, directionFilter],
	);

	const { data: signalsData, isLoading } = useGetResult(undefined, {
		query: {
			queryFn: getSignalResultsMock,
			staleTime: Infinity,
		},
	});
	const hasSignals = signalsData?.data ? mapStrategyResultResponseToSignals(signalsData.data).length > 0 : false;
	const disabled = isLoading || !hasSignals;

	function openSignalHistoryModal(signal: Signal) {
		modals.open({
			title: `История сигнала: ${signal.asset}`,
			size: 'md',
			children: (
				<HistoryTableBoundary
					tradeCode={signal.tradeCode}
					strategyName={signal.strategy}
				/>
			),
		});
	}

	return (
		<>
			<PageHeader title='Сигналы' />

			<SignalsSummaryBoundary />

			<Stack>
				<Stack gap='sm'>
					<SignalsFilters
						searchQuery={searchQuery}
						sortOption={sortOption}
						directionFilter={directionFilter}
						disabled={disabled}
						isLoading={isLoading}
						onSearchQueryChange={setSearchQuery}
						onSortOptionChange={setSortOption}
						onDirectionFilterChange={setDirectionFilter}
					/>
				</Stack>

				<SignalsListBoundary
					filters={filters}
					onSignalSelect={openSignalHistoryModal}
				/>
			</Stack>
		</>
	);
}
