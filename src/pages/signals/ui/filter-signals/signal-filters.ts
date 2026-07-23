import type { Signal } from '@/entities/signal';
import type { GetStrategyResultsParams } from '@/shared/api';

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

export function getSignalRequestParams(sortOption: SortOption): GetStrategyResultsParams {
	const sortBy = {
		'date-desc': 'dateTimeDesc',
		'date-asc': 'dateTimeAsc',
		'asset-asc': 'assetAsc',
		'asset-desc': 'assetDesc',
		'confidence-desc': 'accuracyDesc',
		'confidence-asc': 'accuracyAsc',
	} as const;

	return { sortBy: [sortBy[sortOption]] };
}

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
	return filterSignalsBySearch(byDirection, filters.searchQuery);
}
