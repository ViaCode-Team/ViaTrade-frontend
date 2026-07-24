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
import { useGetStockCodesSuspense } from '@/entities/trade-code';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

export const REMINDERS_PAGE_SIZE = 12;

export function useRemindList(instrumentId?: number) {
	const queryClient = useQueryClient();
	const { filters, setFilter, resetFilters } = useUrlFilters(remindFiltersSchema);
	const page = Math.max(Number(filters.page) || 1, 1);
	const sortBy: ReminderSortField[] = [filters.listSort === 'date-asc' ? 'dateTimeAsc' : 'dateTimeDesc'];
	const params = { page, pageSize: REMINDERS_PAGE_SIZE, sortBy };
	const queryOptions = instrumentId === undefined
		? getGetUserRemindersSuspenseQueryOptions(params)
		: getGetUserRemindersByInstrumentSuspenseQueryOptions(instrumentId ?? 0, params);
	const activeQuery = useSuspenseQuery({ ...queryOptions, refetchInterval: QUERY_REFETCH_INTERVAL });
	const response = activeQuery.data;
	const { data: stocksResponse } = useGetStockCodesSuspense({ page: 1, pageSize: 100 });

	const reminds = response.data.items.map((reminder) => {
		const item = mapTradeRemindToRemindItem(reminder);
		const tradeCode = stocksResponse.data.items.find((stock) => stock.id === reminder.tradeCodeId);
		if (item.source && tradeCode) {
			item.source.label = tradeCode.exchangeId;
			item.source.id = tradeCode.exchangeId.toLowerCase();
		}
		return item;
	});

	const updateRemindMutation = useUpdateUserReminder();
	const handleRemindChange = (id: string, updates: { text: string; date: string; time: string }, onSuccess?: () => void) => {
		const remind = reminds.find((item) => item.id === id);
		if (!remind)
			return;

		updateRemindMutation.mutate({ id: Number(id), data: { text: updates.text, dateTime: `${updates.date}T${updates.time}:00.000Z` } }, {
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
