export type RemindSortOption = 'date-asc' | 'date-desc';

export const remindSortOptions = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
];

export const defaultFilters = {
	rq: '',
	sort: 'date-desc' as RemindSortOption,
};
