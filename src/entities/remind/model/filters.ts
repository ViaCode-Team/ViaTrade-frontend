import { v } from '@/shared/lib/validation';

export type RemindSortOption = 'date-asc' | 'date-desc';

export const remindSortOptions = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
];

export const remindFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	page: v.fallback(v.string(), '1'),
	listSort: v.fallback(
		v.picklist(['date-asc', 'date-desc']),
		'date-desc',
	),
});

export const defaultFilters = v.parse(remindFiltersSchema, {});
