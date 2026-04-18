import { SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useMemo, useState } from 'react';

import type { Signal } from '@/entities/signal';

import { mockSignals, SignalCard } from '@/entities/signal';

import {
	type DirectionFilter,
	getFilteredSignals,
	type SortOption,
	type TypeFilter,
} from './model/signal-filters';
import cls from './signals-page.module.css';
import { HistoryTable } from './ui/history-table';
import { SignalsFilters } from './ui/signals-filters';

export function SignalsPage() {
	const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState<SortOption>('date-desc');
	const [directionFilter, setDirectionFilter] = useState<DirectionFilter>('all');
	const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

	const filteredAndSortedSignals = useMemo(() => {
		return getFilteredSignals(mockSignals, {
			searchQuery,
			sortOption,
			directionFilter,
			typeFilter,
		});
	}, [searchQuery, sortOption, directionFilter, typeFilter]);

	return (
		<Stack gap='lg'>
			<Stack gap='sm'>
				<SignalsFilters
					searchQuery={searchQuery}
					sortOption={sortOption}
					directionFilter={directionFilter}
					typeFilter={typeFilter}
					onSearchQueryChange={setSearchQuery}
					onSortOptionChange={setSortOption}
					onDirectionFilterChange={setDirectionFilter}
					onTypeFilterChange={setTypeFilter}
				/>

				<Text size='sm' c='dimmed'>
					Найдено сигналов:
					<Text component='span' fw='bold' c='var(--mantine-color-text)'>
						{' '}
						{filteredAndSortedSignals.length}
					</Text>
				</Text>
			</Stack>

			<SimpleGrid
				minColWidth='280px'
				spacing={{ base: 'sm', sm: 'lg' }}
				component='ul'
				className={cls.signalsGrid}
			>
				{filteredAndSortedSignals.map((signal) => (
					<li key={signal.id} className={cls.signalItem}>
						<SignalCard
							signal={signal}
							onClick={setSelectedSignal}
						/>
					</li>
				))}
			</SimpleGrid>


			{filteredAndSortedSignals.length === 0 && (
				<Stack gap='xs' justify='center'>
					<Title order={4}>
						Ничего не найдено
					</Title>
					<Text size='sm' c='dimmed'>
						Попробуйте изменить параметры поиска или фильтры
					</Text>
				</Stack>
			)}

			{selectedSignal && (
				<HistoryTable
					asset={selectedSignal.asset}
					strategy={selectedSignal.strategy}
					onClose={() => setSelectedSignal(null)}
				/>
			)}
		</Stack>
	);
}
