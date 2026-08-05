export type SortOption = 'date-desc' | 'date-asc' | 'asset-asc' | 'asset-desc' | 'confidence-desc' | 'confidence-asc';
export type DirectionFilter = 'all' | 'buy' | 'sell';

export type SignalFilters = {
	sortOption: SortOption;
	directionFilter: DirectionFilter;
	page: number;
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
