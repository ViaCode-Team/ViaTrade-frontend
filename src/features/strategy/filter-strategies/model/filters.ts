export type StrategySortOption = 'name-asc' | 'name-desc' | 'accuracy-desc' | 'accuracy-asc';
export type StrategyStatusFilter = 'all' | 'active' | 'inactive';

export const strategySortOptions = [
	{ value: 'name-asc', label: 'По названию (от А до Я)' },
	{ value: 'name-desc', label: 'По названию (от Я до А)' },
	{ value: 'accuracy-desc', label: 'По точности (убывание)' },
	{ value: 'accuracy-asc', label: 'По точности (возрастание)' },
];

export const defaultFilters = {
	q: '',
	sort: 'name-asc' as StrategySortOption,
	filter: 'all' as StrategyStatusFilter,
};
