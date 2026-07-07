import { v } from '@/shared/lib/validation';

export type StrategySortOption = 'name-asc' | 'name-desc' | 'accuracy-desc' | 'accuracy-asc';
export type StrategyStatusFilter = 'all' | 'active' | 'inactive';

export const strategySortOptions = [
	{ value: 'name-asc', label: 'По названию (от А до Я)' },
	{ value: 'name-desc', label: 'По названию (от Я до А)' },
	{ value: 'accuracy-desc', label: 'По точности (убывание)' },
	{ value: 'accuracy-asc', label: 'По точности (возрастание)' },
];

export const strategyFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	listSort: v.fallback(
		v.picklist(['name-asc', 'name-desc', 'accuracy-desc', 'accuracy-asc']),
		'name-asc',
	),
	statusFilter: v.fallback(
		v.picklist(['all', 'active', 'inactive']),
		'all',
	),
});

export const defaultFilters = v.parse(strategyFiltersSchema, {});
