import {
	Group,
	Paper,
	Select,
	SimpleGrid,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { IconFilter, IconSearch, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import type { Signal } from '@/entities/signal';

import { mockSignals } from '@/entities/signal';
import { SignalCard } from '@/entities/signal/ui/signal-card';
import { HistoryTable } from '@/shared/ui/history-table';

import classes from './signals-page.module.css';

type SortOption = 'date-desc' | 'date-asc' | 'confidence-desc' | 'confidence-asc' | 'asset-asc';
type DirectionFilter = 'all' | 'buy' | 'sell';
type TypeFilter = 'all' | 'stock' | 'futures';

const sortData = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
	{ value: 'confidence-desc', label: 'По надёжности (убывание)' },
	{ value: 'confidence-asc', label: 'По надёжности (возрастание)' },
	{ value: 'asset-asc', label: 'По алфавиту' },
];

const directionData = [
	{ value: 'all', label: 'Все сигналы' },
	{ value: 'buy', label: 'Покупка' },
	{ value: 'sell', label: 'Продажа' },
];

const typeData = [
	{ value: 'all', label: 'Все типы' },
	{ value: 'stock', label: 'Акции' },
	{ value: 'futures', label: 'Фьючерсы' },
];

export function SignalsPage() {
	const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState<SortOption>('date-desc');
	const [directionFilter, setDirectionFilter] = useState<DirectionFilter>('all');
	const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

	const filteredAndSortedSignals = useMemo(() => {
		let result = [...mockSignals];

		if (directionFilter !== 'all') {
			result = result.filter((s) => s.direction === directionFilter);
		}

		if (typeFilter !== 'all') {
			result = result.filter((s) => s.type === typeFilter);
		}

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(s) =>
					s.asset.toLowerCase().includes(query)
					|| s.strategy.toLowerCase().includes(query),
			);
		}

		result.sort((a, b) => {
			switch (sortOption) {
				case 'date-desc':
					return new Date(b.date).getTime() - new Date(a.date).getTime();
				case 'date-asc':
					return new Date(a.date).getTime() - new Date(b.date).getTime();
				case 'confidence-desc':
					return b.confidence - a.confidence;
				case 'confidence-asc':
					return a.confidence - b.confidence;
				case 'asset-asc':
					return a.asset.localeCompare(b.asset);
				default:
					return 0;
			}
		});

		return result;
	}, [searchQuery, sortOption, directionFilter, typeFilter]);

	const buySignals = filteredAndSortedSignals.filter((s) => s.direction === 'buy');
	const sellSignals = filteredAndSortedSignals.filter((s) => s.direction === 'sell');

	return (
		<>
			<Title order={2} fw='bold' mb='sm'>
				Сигналы
			</Title>

			<Paper mb='lg'>
				<SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='sm'>
					<TextInput
						size='sm'
						placeholder='Поиск по активу или стратегии...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.currentTarget.value)}
						leftSection={<IconSearch size={16} />}
					/>
					<Select
						data={sortData}
						value={sortOption}
						onChange={(v) => setSortOption(v as SortOption)}
						size='sm'
					/>
					<Select
						data={directionData}
						value={directionFilter}
						onChange={(v) => setDirectionFilter(v as DirectionFilter)}
						size='sm'
						leftSection={<IconFilter size={16} />}
					/>
					<Select
						data={typeData}
						value={typeFilter}
						onChange={(v) => setTypeFilter(v as TypeFilter)}
						size='sm'
					/>
				</SimpleGrid>
			</Paper>

			<Text size='sm' c='dimmed' mb='sm'>
				Найдено сигналов:
				<Text component='span' fw='bold' c='var(--mantine-color-text)'>
					{' '}
					{filteredAndSortedSignals.length}
				</Text>
			</Text>

			{buySignals.length > 0 && (
				<>
					<Title order={4} mt='lg' mb='sm'>
						<Group gap='xs'>
							<IconTrendingUp size={20} color='var(--mantine-color-green-6)' />
							Сигналы на покупку
							<Text size='xs' c='dimmed' ml='xs'>
								(
								{buySignals.length}
								)
							</Text>
						</Group>
					</Title>
					<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='lg'>
						{buySignals.map((signal) => (
							<SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />
						))}
					</SimpleGrid>
				</>
			)}

			{sellSignals.length > 0 && (
				<>
					<Title order={4} mt='xl' mb='sm'>
						<Group gap='xs'>
							<IconTrendingDown size={20} color='var(--mantine-color-red-6)' />
							Сигналы на продажу
							<Text size='xs' c='dimmed' ml='xs'>
								(
								{sellSignals.length}
								)
							</Text>
						</Group>
					</Title>
					<SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing='lg'>
						{sellSignals.map((signal) => (
							<SignalCard key={signal.id} signal={signal} onClick={setSelectedSignal} />
						))}
					</SimpleGrid>
				</>
			)}

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
