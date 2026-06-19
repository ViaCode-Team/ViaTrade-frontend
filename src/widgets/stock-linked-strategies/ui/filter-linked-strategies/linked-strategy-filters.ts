export type LinkedStrategySortOption = 'name-asc' | 'name-desc' | 'accuracy-desc' | 'accuracy-asc';
export type LinkedStrategyStatusFilter = 'all' | 'active' | 'inactive';

export type LinkedStrategyFilters = {
	searchQuery: string;
	sortOption: LinkedStrategySortOption;
	statusFilter: LinkedStrategyStatusFilter;
};

export const linkedStrategySortOptions = [
	{ value: 'name-asc', label: 'По названию (от А до Я)' },
	{ value: 'name-desc', label: 'По названию (от Я до А)' },
	{ value: 'accuracy-desc', label: 'По точности (убывание)' },
	{ value: 'accuracy-asc', label: 'По точности (возрастание)' },
];
