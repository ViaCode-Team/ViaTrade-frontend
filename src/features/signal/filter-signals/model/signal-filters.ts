import type { Signal } from '@/entities/signal';

export type SortOption = 'date-desc' | 'date-asc' | 'asset-asc' | 'asset-desc' | 'confidence-desc' | 'confidence-asc';
export type DirectionFilter = 'all' | 'buy' | 'sell';

export type SignalFilters = {
	searchQuery: string;
	sortOption: SortOption;
	directionFilter: DirectionFilter;
};

export const sortOptions: Array<{ value: SortOption; label: string }> = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
	{ value: 'asset-asc', label: 'По активу (от А до Я)' },
	{ value: 'asset-desc', label: 'По активу (от Я до А)' },
	{ value: 'confidence-desc', label: 'По надёжности (убывание)' },
	{ value: 'confidence-asc', label: 'По надёжности (возрастание)' },
];

export const directionOptions: Array<{ value: DirectionFilter; label: string }> = [
	{ value: 'all', label: 'Все' },
	{ value: 'buy', label: 'Покупать' },
	{ value: 'sell', label: 'Продавать' },
];

function filterSignalsByDirection(signals: Signal[], directionFilter: DirectionFilter) {
	if (directionFilter === 'all')
		return signals;

	return signals.filter((signal) => signal.direction === directionFilter);
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
				return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
			case 'date-asc':
				return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
			case 'confidence-desc':
				return getConfidenceSortValue(b) - getConfidenceSortValue(a);
			case 'confidence-asc':
				return getConfidenceSortValue(a) - getConfidenceSortValue(b);
			case 'asset-asc':
				return a.asset.localeCompare(b.asset);
			case 'asset-desc':
				return b.asset.localeCompare(a.asset);
			default:
				return 0;
		}
	});
}

export function getFilteredSignals(signals: Signal[], filters: SignalFilters) {
	const byDirection = filterSignalsByDirection(signals, filters.directionFilter);
	const bySearch = filterSignalsBySearch(byDirection, filters.searchQuery);

	return sortSignals(bySearch, filters.sortOption);
}

function getConfidenceSortValue(signal: Signal) {
	return signal.confidence ?? -1;
}
