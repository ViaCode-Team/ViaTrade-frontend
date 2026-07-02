import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { mapTradeRemindToRemindItem } from '@/entities/remind';
import {
	getGetAllByUserSuspenseQueryOptions,
	getGetByUserInstrumentSuspenseQueryOptions,
	getGetRemindStatisticsQueryKey,
	useUpdate,
} from '@/entities/remind';
import { remindFiltersSchema } from '@/entities/remind';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

export function useRemindList(instrumentId?: number) {
	const queryClient = useQueryClient();
	const { filters } = useUrlFilters(remindFiltersSchema);
	const searchQuery = filters.q.toLowerCase();
	const sortOption = filters.listSort;

	const queryOpts = instrumentId === undefined
		? getGetAllByUserSuspenseQueryOptions()
		: getGetByUserInstrumentSuspenseQueryOptions(instrumentId);

	const { data: response, refetch } = useSuspenseQuery({
		...queryOpts,
		refetchInterval: QUERY_REFETCH_INTERVAL,
	});
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();

	const reminds = response.data
		.map((r) => {
			const item = mapTradeRemindToRemindItem(r);
			const tradeCode = stocksResponse.data.find((tc) => tc.id === r.tradeCodeId);
			if (item.source && tradeCode) {
				item.source.label = tradeCode.exchangeId;
				item.source.id = tradeCode.exchangeId.toLowerCase();
			}
			return item;
		});

	const updateRemindMutation = useUpdate();

	const handleRemindChange = (remindId: string, updates: { text: string; date: string; time: string }, onSuccess?: () => void) => {
		const remind = reminds.find((r) => r.id === remindId);
		if (!remind) {
			return;
		}


		updateRemindMutation.mutate({
			remindId: Number(remindId),
			data: {
				textRemind: updates.text,
				dateTime: `${updates.date}T${updates.time}:00.000Z`,
			},
		}, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: getGetRemindStatisticsQueryKey() });
				queryClient.setQueryData(queryOpts.queryKey, (oldData) => {
					if (!oldData)
						return oldData;
					return {
						...oldData,
						data: oldData.data.map((r) =>
							r.id === Number(remindId)
								? { ...r, textRemind: updates.text, dateTime: `${updates.date}T${updates.time}:00.000Z` }
								: r,
						),
					};
				});
				onSuccess?.();
			},
		});
	};

	const filteredReminds = reminds.filter((remind) =>
		remind.text.toLowerCase().includes(searchQuery),
	);

	filteredReminds.sort((a, b) => {
		const dateA = new Date(`${a.date}T${a.time}`).getTime();
		const dateB = new Date(`${b.date}T${b.time}`).getTime();

		if (sortOption === 'date-asc') {
			return dateA - dateB;
		}
		return dateB - dateA;
	});

	return {
		reminds,
		filteredReminds,
		handleRemindChange,
		refetch,
	};
}
