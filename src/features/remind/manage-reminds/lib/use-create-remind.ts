import { useQueryClient } from '@tanstack/react-query';

import type { ReminderResponse } from '@/shared/api';

import {
	getGetInstrumentRemindersQueryKey,
	useCreateInstrumentReminder,
} from '@/entities/instrument';
import {
	getGetRemindersQueryKey,
	invalidateGetReminderStatistics,
} from '@/entities/reminder';

import { getCurrentReminderDateTime } from './remind-date-time';

const DEFAULT_REMINDER_TEXT = 'Новое напоминание';

type CachedRemindersPage = {
	data: {
		items: ReminderResponse[];
		totalCount: number;
		page: number;
		pageSize: number;
		totalPages: number;
	};
};

export function useCreateRemind() {
	const queryClient = useQueryClient();
	const createReminderMutation = useCreateInstrumentReminder();

	const createRemind = (instrumentId: number, onSuccess?: () => void) => {
		createReminderMutation.mutate(
			{
				instrumentId,
				data: {
					text: DEFAULT_REMINDER_TEXT,
					remindAt: getCurrentReminderDateTime(),
				},
			},
			{
				onSuccess: ({ data: reminder }) => {
					const instrumentQueryKey = getGetInstrumentRemindersQueryKey(instrumentId);
					const remindersQueryKey = getGetRemindersQueryKey();

					addReminderToCachedLists(queryClient, instrumentQueryKey, reminder);
					addReminderToCachedLists(queryClient, remindersQueryKey, reminder);
					void queryClient.invalidateQueries({ queryKey: instrumentQueryKey, refetchType: 'none' });
					void queryClient.invalidateQueries({ queryKey: remindersQueryKey, refetchType: 'none' });
					void invalidateGetReminderStatistics(queryClient);
					onSuccess?.();
				},
			},
		);
	};

	return {
		createRemind,
		isPending: createReminderMutation.isPending,
	};
}

function addReminderToCachedLists(
	queryClient: ReturnType<typeof useQueryClient>,
	queryKey: readonly unknown[],
	reminder: ReminderResponse,
) {
	queryClient.getQueriesData<CachedRemindersPage>({ queryKey }).forEach(([key]) => {
		queryClient.setQueryData<CachedRemindersPage>(key, (current) => {
			if (!current || current.data.items.some((item) => item.id === reminder.id)) {
				return current;
			}

			const isFirstPage = current.data.page === 1;
			const isAscending = hasAscendingSort(key);
			const items = isFirstPage && (!isAscending || current.data.items.length < current.data.pageSize)
				? insertReminder(current.data.items, reminder, isAscending, current.data.pageSize)
				: current.data.items;
			const totalCount = current.data.totalCount + 1;

			return {
				...current,
				data: {
					...current.data,
					items,
					totalCount,
					totalPages: Math.ceil(totalCount / current.data.pageSize),
				},
			};
		});
	});
}

function hasAscendingSort(queryKey: readonly unknown[]) {
	const params = queryKey[1];

	return (
		typeof params === 'object'
		&& params !== null
		&& 'sortBy' in params
		&& Array.isArray(params.sortBy)
		&& params.sortBy.includes('remindAtAsc')
	);
}

function insertReminder(
	reminders: ReminderResponse[],
	reminder: ReminderResponse,
	isAscending: boolean,
	pageSize: number,
) {
	return [...reminders, reminder]
		.sort((first, second) => {
			const difference = new Date(first.remindAt).getTime() - new Date(second.remindAt).getTime();

			return isAscending ? difference : -difference;
		})
		.slice(0, pageSize);
}
