import { Stack, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo, useState } from 'react';

import type { Signal } from '@/entities/signal';

import type {
	DirectionFilter,
	SortOption,
} from './model/signal-filters';

import { HistoryTableBoundary } from './ui/history-table';
import { SignalsFilters } from './ui/signals-filters';
import { SignalsListBoundary } from './ui/signals-list';

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
			<Title order={1}>Сигналы</Title>

			<Stack>
				<Stack gap='sm'>
					<SignalsFilters
						searchQuery={searchQuery}
						sortOption={sortOption}
						directionFilter={directionFilter}
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
