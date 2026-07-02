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
	getGetAllByUserQueryKey,
	getGetByUserInstrumentQueryKey,
	getGetRemindStatisticsQueryKey,
	useCreate,
} from '@/entities/remind';
import { mapTradeCodeToStock } from '@/entities/stock';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code';

export function AddRemind() {
	const queryClient = useQueryClient();
	const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();
	const stocks = stocksResponse.data.map(mapTradeCodeToStock);
	const createRemindMutation = useCreate();

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
			idInstrument: stock.instrumentId,
			data: {
				textRemind: 'Новое напоминание',
				dateTime: dayjs(now).format('YYYY-MM-DDTHH:mm:ss'),
			},
		}, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: getGetRemindStatisticsQueryKey() });
				queryClient.invalidateQueries({ queryKey: getGetAllByUserQueryKey() });
				queryClient.invalidateQueries({ queryKey: getGetByUserInstrumentQueryKey(stock.instrumentId) });
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
