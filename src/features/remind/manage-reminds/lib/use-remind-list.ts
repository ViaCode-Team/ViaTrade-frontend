import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import type { ReminderSortField } from '@/shared/api';

import {
	getGetRemindersQueryKey as getGetInstrumentRemindersQueryKey,
	getGetRemindersSuspenseQueryOptions as getGetInstrumentRemindersSuspenseQueryOptions,
} from '@/entities/instrument';
import { mapTradeRemindToRemindItem } from '@/entities/reminder';
import {
	getGetRemindersQueryKey,
	getGetRemindersSuspenseQueryOptions,
	getGetReminderStatisticsQueryKey,
	remindFiltersSchema,
	useUpdateReminder,
} from '@/entities/reminder';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

import { getReminderDateTimeFromLocalParts } from './remind-date-time';

export const REMINDERS_PAGE_SIZE = 15;

export function useRemindList(instrumentId?: number) {
	const queryClient = useQueryClient();
	const { filters, setFilter, resetFilters } = useUrlFilters(remindFiltersSchema);
	const page = Math.max(Number(filters.page) || 1, 1);
	const sortBy: ReminderSortField[] = [filters.listSort === 'date-asc' ? 'remindAtAsc' : 'remindAtDesc'];
	const params = { page, pageSize: REMINDERS_PAGE_SIZE, sortBy };
	const queryOptions = instrumentId === undefined
		? getGetRemindersSuspenseQueryOptions(params)
		: getGetInstrumentRemindersSuspenseQueryOptions(instrumentId, params);
	const activeQuery = useSuspenseQuery({ ...queryOptions, refetchInterval: QUERY_REFETCH_INTERVAL });
	const response = activeQuery.data;
	const reminds = response.data.items.map(mapTradeRemindToRemindItem);

	const updateRemindMutation = useUpdateReminder();
	const handleRemindChange = (id: string, updates: { text: string; date: string; time: string }, onSuccess?: () => void) => {
		const remind = reminds.find((item) => item.id === id);
		if (!remind)
			return;

		updateRemindMutation.mutate({ reminderId: Number(id), data: { text: updates.text, remindAt: getReminderDateTimeFromLocalParts(updates.date, updates.time) } }, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: getGetReminderStatisticsQueryKey() });
				queryClient.invalidateQueries({ queryKey: instrumentId === undefined ? getGetRemindersQueryKey() : getGetInstrumentRemindersQueryKey(instrumentId) });
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
