import {
	Button,
	Group,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import {
	getGetReminderStatisticsQueryKey,
	getGetUserRemindersByInstrumentQueryKey,
	getGetUserRemindersQueryKey,
	useCreateUserRemind,
} from '@/entities/remind';
import { mapTradeCodeToStock } from '@/entities/stock';
import { useGetStockCodesSuspense } from '@/entities/trade-code';

export function AddRemind() {
	const queryClient = useQueryClient();
	const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
	const { data: stocksResponse } = useGetStockCodesSuspense({ page: 1, pageSize: 100 });
	const stocks = stocksResponse.data.items.map(mapTradeCodeToStock);
	const createRemindMutation = useCreateUserRemind();

	const stockSelectData = stocks.map((stock) => ({
		value: stock.id,
		label: `${stock.ticker} — ${stock.name}`,
	}));

	const handleAdd = () => {
		if (!selectedStockId) {
			return;
		}

		const stock = stocks.find((s) => s.id === selectedStockId);

		if (!stock) {
			return;
		}

		const now = new Date();
		// Round down to the nearest minute to avoid seconds
		now.setSeconds(0, 0);
		now.setHours(now.getHours() + 3);

		createRemindMutation.mutate({
			tradeCodeId: stock.instrumentId,
			data: {
				text: 'Новое напоминание',
				dateTime: dayjs(now).format('YYYY-MM-DDTHH:mm:ss'),
			},
		}, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: getGetReminderStatisticsQueryKey() });
				queryClient.invalidateQueries({ queryKey: getGetUserRemindersQueryKey() });
				queryClient.invalidateQueries({ queryKey: getGetUserRemindersByInstrumentQueryKey(stock.instrumentId) });
				modals.closeAll();
			},
		});
	};

	return (
		<Stack gap='md'>
			<Text size='sm' c='dimmed'>
				Выберите акцию, к которой будет привязано напоминание.
			</Text>

			<Select
				label='Акция'
				placeholder='Акция...'
				data={stockSelectData}
				value={selectedStockId}
				onChange={setSelectedStockId}
				searchable
				nothingFoundMessage='Акции не найдены'
				withAsterisk
				disabled={createRemindMutation.isPending}
			/>

			<Group justify='flex-end' mt='md'>
				<Button variant='default' onClick={() => modals.closeAll()} disabled={createRemindMutation.isPending}>
					Отмена
				</Button>
				<Button onClick={handleAdd} disabled={!selectedStockId || createRemindMutation.isPending} loading={createRemindMutation.isPending}>
					Создать
				</Button>
			</Group>
		</Stack>
	);
}
