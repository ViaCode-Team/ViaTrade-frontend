import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

import { mapTradeRemindToRemindItem } from '@/entities/remind';
import { getGetAllByUserSuspenseQueryOptions, getGetTradeRemindByUserInstrumentSuspenseQueryOptions, useUpdateRemind } from '@/entities/remind/api/gen';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';

export function useRemindList(instrumentId?: number) {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('rq')?.toLowerCase() || '';
	const sortOption = searchParams.get('sort') || 'date-desc';

	const queryOpts = instrumentId
		? getGetTradeRemindByUserInstrumentSuspenseQueryOptions(instrumentId)
		: getGetAllByUserSuspenseQueryOptions();

	const { data: response } = useSuspenseQuery({
		...queryOpts,
		refetchInterval: 60000,
	});
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();
	const [now] = useState(Date.now);

	const reminds = response.data
		.map((r) => {
			const item = mapTradeRemindToRemindItem(r);
			const tradeCode = stocksResponse.data.find((tc) => tc.id === r.tradeCodeId);
			if (item.source && tradeCode) {
				item.source.label = tradeCode.exchangeId;
				item.source.id = tradeCode.exchangeId.toLowerCase();
			}
			return item;
		})
		.filter((r) => new Date(`${r.date}T${r.time}`).getTime() >= now);

	const updateRemindMutation = useUpdateRemind();

	const handleRemindChange = (remindId: string, updates: { text: string; date: string; time: string }) => {
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
	};
}
