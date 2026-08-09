import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import type { ReminderSortField } from '@/shared/api';

import {
	getGetInstrumentRemindersSuspenseQueryOptions,
	getInstrumentReminders,
	invalidateGetInstrumentReminders,
} from '@/entities/instrument';
import { mapTradeRemindToRemindItem } from '@/entities/reminder';
import {
	getGetRemindersSuspenseQueryOptions,
	remindFiltersSchema,
	useUpdateReminder,
} from '@/entities/reminder';
import { isApiErrorWithStatus } from '@/shared/api';
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
		: getGetInstrumentRemindersSuspenseQueryOptions(instrumentId, params, {
				query: {
					queryFn: async ({ signal }) => {
						try {
							return await getInstrumentReminders(instrumentId, params, { signal });
						}
						catch (error) {
							if (isApiErrorWithStatus(error, 404)) {
								return createEmptyRemindersResponse();
							}

							throw error;
						}
					},
				},
			});
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
				if (instrumentId !== undefined)
					void invalidateGetInstrumentReminders(queryClient, instrumentId);

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

function createEmptyRemindersResponse(): Awaited<ReturnType<typeof getInstrumentReminders>> {
	return {
		data: {
			items: [],
			totalCount: 0,
			page: 1,
			pageSize: REMINDERS_PAGE_SIZE,
			totalPages: 0,
		},
		headers: new Headers(),
		status: 200,
	};
}
