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

export function getFilteredSignals(signals: Signal[], filters: SignalFilters) {
	const byDirection = filterSignalsByDirection(signals, filters.directionFilter);
	const filtered = filterSignalsBySearch(byDirection, filters.searchQuery);

	return [...filtered].sort((left, right) => {
		switch (filters.sortOption) {
			case 'date-asc':
				return new Date(left.occurredAt).getTime() - new Date(right.occurredAt).getTime();
			case 'date-desc':
				return new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime();
			case 'asset-asc':
				return left.asset.localeCompare(right.asset);
			case 'asset-desc':
				return right.asset.localeCompare(left.asset);
			case 'confidence-asc':
				return (left.confidence ?? 0) - (right.confidence ?? 0);
			case 'confidence-desc':
				return (right.confidence ?? 0) - (left.confidence ?? 0);
		}

		return 0;
	});
}
