import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { mapTradeRemindToRemindItem } from '@/entities/remind';
import { getGetAllByUserSuspenseQueryOptions, getGetTradeRemindByUserInstrumentSuspenseQueryOptions, useUpdateRemind } from '@/entities/remind';
import { remindFiltersSchema } from '@/entities/remind';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code';
import { useUrlFilters } from '@/shared/lib/hooks';

export function useRemindList(instrumentId?: number) {
	const queryClient = useQueryClient();
	const { filters } = useUrlFilters(remindFiltersSchema);
	const searchQuery = filters.q.toLowerCase();
	const sortOption = filters.listSort;

	const queryOpts = instrumentId
		? getGetTradeRemindByUserInstrumentSuspenseQueryOptions(instrumentId)
		: getGetAllByUserSuspenseQueryOptions();

	const { data: response, refetch } = useSuspenseQuery({
		...queryOpts,
		refetchInterval: 300000,
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

	const updateRemindMutation = useUpdateRemind();

	const handleRemindChange = (remindId: string, updates: { text: string; date: string; time: string }, onSuccess?: () => void) => {
		const remind = reminds.find((r) => r.id === remindId);
		if (!remind) {
			return;
		}


		updateRemindMutation.mutate({
			redindId: Number(remindId),
			data: {
				textRemind: updates.text,
				dateTime: `${updates.date}T${updates.time}:00.000Z`,
			},
		}, {
			onSuccess: () => {
				queryClient.setQueryData(queryOpts.queryKey, (oldData: any) => {
					if (!oldData)
						return oldData;
					return {
						...oldData,
						data: oldData.data.map((r: any) =>
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

	filteredReminds.sort((a: any, b: any) => {
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
