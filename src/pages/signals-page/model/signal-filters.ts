import type { Signal } from '@/entities/signal';

export type SortOption = 'date-desc' | 'date-asc' | 'confidence-desc' | 'confidence-asc' | 'asset-asc';
export type DirectionFilter = 'all' | 'buy' | 'sell';
export type TypeFilter = 'all' | 'stock' | 'futures';

export type SignalFilters = {
	searchQuery: string;
	sortOption: SortOption;
	directionFilter: DirectionFilter;
	typeFilter: TypeFilter;
};

export const sortOptions: Array<{ value: SortOption; label: string }> = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
	{ value: 'confidence-desc', label: 'По надёжности (убывание)' },
	{ value: 'confidence-asc', label: 'По надёжности (возрастание)' },
	{ value: 'asset-asc', label: 'По алфавиту' },
];

export const directionOptions: Array<{ value: DirectionFilter; label: string }> = [
	{ value: 'all', label: 'Все сигналы' },
	{ value: 'buy', label: 'Покупка' },
	{ value: 'sell', label: 'Продажа' },
];

export const typeOptions: Array<{ value: TypeFilter; label: string }> = [
	{ value: 'all', label: 'Все типы' },
	{ value: 'stock', label: 'Акции' },
	{ value: 'futures', label: 'Фьючерсы' },
];

function filterSignalsByDirection(signals: Signal[], directionFilter: DirectionFilter) {
	if (directionFilter === 'all')
		return signals;

	return signals.filter((signal) => signal.direction === directionFilter);
}

function filterSignalsByType(signals: Signal[], typeFilter: TypeFilter) {
	if (typeFilter === 'all')
		return signals;

	return signals.filter((signal) => signal.type === typeFilter);
}

function filterSignalsBySearch(signals: Signal[], searchQuery: string) {
	if (!searchQuery.trim())
		return signals;

	const normalizedQuery = searchQuery.toLowerCase();

	return signals.filter((signal) =>
		signal.asset.toLowerCase().includes(normalizedQuery)
		|| signal.strategy.toLowerCase().includes(normalizedQuery),
	);
}

function sortSignals(signals: Signal[], sortOption: SortOption) {
	return [...signals].sort((a, b) => {
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
}

export function getFilteredSignals(signals: Signal[], filters: SignalFilters) {
	const byDirection = filterSignalsByDirection(signals, filters.directionFilter);
	const byType = filterSignalsByType(byDirection, filters.typeFilter);
	const bySearch = filterSignalsBySearch(byType, filters.searchQuery);

	return sortSignals(bySearch, filters.sortOption);
}
