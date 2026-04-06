import { Text, Title } from '@mantine/core';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import type { Signal } from '@/entities/signal';

import { mockSignals } from '@/entities/signal';

import {
	type DirectionFilter,
	getFilteredSignals,
	type SortOption,
	type TypeFilter,
} from './model/signal-filters';
import classes from './signals-page.module.css';
import { HistoryTable } from './ui/history-table';
import { SignalsCardsSection } from './ui/signals-cards-section';
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

	const buySignals = filteredAndSortedSignals.filter((s) => s.direction === 'buy');
	const sellSignals = filteredAndSortedSignals.filter((s) => s.direction === 'sell');

	return (
		<>
			<Title order={2} fw='bold' mb='sm'>
				Сигналы
			</Title>

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

			<Text size='sm' c='dimmed' mb='sm'>
				Найдено сигналов:
				<Text component='span' fw='bold' c='var(--mantine-color-text)'>
					{' '}
					{filteredAndSortedSignals.length}
				</Text>
			</Text>

			<SignalsCardsSection
				title='Сигналы на покупку'
				icon={<IconTrendingUp size={20} color='var(--mantine-color-green-6)' />}
				signals={buySignals}
				onSignalSelect={setSelectedSignal}
			/>

			<SignalsCardsSection
				title='Сигналы на продажу'
				icon={<IconTrendingDown size={20} color='var(--mantine-color-red-6)' />}
				signals={sellSignals}
				marginTop='xl'
				onSignalSelect={setSelectedSignal}
			/>

			{filteredAndSortedSignals.length === 0 && (
				<div className={classes.emptyState}>
					<Title order={4} c='dimmed'>
						Сигналы не найдены
					</Title>
					<Text size='sm' c='dimmed'>
						Попробуйте изменить параметры поиска или фильтры
					</Text>
				</div>
			)}

			{selectedSignal && (
				<HistoryTable asset={selectedSignal.asset} onClose={() => setSelectedSignal(null)} />
			)}
		</>
	);
}
