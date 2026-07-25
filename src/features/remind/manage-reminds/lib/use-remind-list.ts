import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import type { ReminderSortField } from '@/shared/api';

import { mapTradeRemindToRemindItem } from '@/entities/remind';
import {
	getGetReminderStatisticsQueryKey,
	getGetUserRemindersByInstrumentQueryKey,
	getGetUserRemindersByInstrumentSuspenseQueryOptions,
	getGetUserRemindersQueryKey,
	getGetUserRemindersSuspenseQueryOptions,
	remindFiltersSchema,
	useUpdateUserReminder,
} from '@/entities/remind';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

import { getReminderDateTimeFromLocalParts } from './remind-date-time';

export const REMINDERS_PAGE_SIZE = 12;

export function useRemindList(instrumentId?: number) {
	const queryClient = useQueryClient();
	const { filters, setFilter, resetFilters } = useUrlFilters(remindFiltersSchema);
	const page = Math.max(Number(filters.page) || 1, 1);
	const sortBy: ReminderSortField[] = [filters.listSort === 'date-asc' ? 'dateTimeAsc' : 'dateTimeDesc'];
	const params = { page, pageSize: REMINDERS_PAGE_SIZE, sortBy };
	const queryOptions = instrumentId === undefined
		? getGetUserRemindersSuspenseQueryOptions(params)
		: getGetUserRemindersByInstrumentSuspenseQueryOptions(instrumentId, params);
	const activeQuery = useSuspenseQuery({ ...queryOptions, refetchInterval: QUERY_REFETCH_INTERVAL });
	const response = activeQuery.data;
	const reminds = response.data.items.map(mapTradeRemindToRemindItem);

	const updateRemindMutation = useUpdateUserReminder();
	const handleRemindChange = (id: string, updates: { text: string; date: string; time: string }, onSuccess?: () => void) => {
		const remind = reminds.find((item) => item.id === id);
		if (!remind)
			return;

		updateRemindMutation.mutate({ id: Number(id), data: { text: updates.text, dateTime: getReminderDateTimeFromLocalParts(updates.date, updates.time) } }, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: getGetReminderStatisticsQueryKey() });
				queryClient.invalidateQueries({ queryKey: instrumentId === undefined ? getGetUserRemindersQueryKey() : getGetUserRemindersByInstrumentQueryKey(instrumentId) });
				onSuccess?.();
			},
		});
	};

	const searchQuery = filters.q.trim().toLowerCase();
	const filteredReminds = searchQuery
		? reminds.filter((remind) => remind.text.toLowerCase().includes(searchQuery))
		: reminds;

	return {
		reminds,
		filteredReminds,
		handleRemindChange,
		refetch: activeQuery.refetch,
		totalCount: response.data.totalCount,
		totalPages: response.data.totalPages,
		page: response.data.page,
		setPage: (nextPage: number) => setFilter('page', String(nextPage)),
		hasSearchQuery: Boolean(searchQuery),
		resetFilters,
	};
}
