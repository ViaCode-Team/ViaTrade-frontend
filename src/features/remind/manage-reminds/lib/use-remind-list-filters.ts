import type { ReminderSortField } from '@/shared/api';

import { remindFiltersSchema } from '@/entities/reminder';
import { useUrlFilters } from '@/shared/lib/url-filters';

import { REMINDERS_PAGE_SIZE } from './remind-list-page-size';

export function useRemindListFilters() {
	const { filters, setFilter, resetFilters } = useUrlFilters(remindFiltersSchema);

	const page = Math.max(Number(filters.page) || 1, 1);
	const searchText = filters.q.trim();
	const sortBy: ReminderSortField[] = [filters.listSort === 'date-asc' ? 'remindAtAsc' : 'remindAtDesc'];

	return {
		params: {
			deliveryStatus: filters.deliveryStatus,
			page,
			pageSize: REMINDERS_PAGE_SIZE,
			searchText: searchText || undefined,
			sortBy,
		},
		page,
		hasActiveFilters: Boolean(searchText) || filters.deliveryStatus !== 'undelivered',
		setPage: (nextPage: number) => setFilter('page', String(nextPage)),
		resetFilters,
	};
}
