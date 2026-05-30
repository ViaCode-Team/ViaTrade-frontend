/* eslint-disable react-refresh/only-export-components */
import {
	Button,
	Group,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useCreateInstrumentRemind } from '@/entities/remind/api/gen';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock } from '@/entities/trade-code/stock';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function AddRemindModal() {
	const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();
	const stocks = stocksResponse.data.map(mapTradeCodeToStock);
	const createRemindMutation = useCreateInstrumentRemind();

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

const AddRemindModalBoundary = withQueryBoundary(AddRemindModal);

export function openAddRemindModal() {
	modals.open({
		title: 'Выбор актива',
		children: <AddRemindModalBoundary />,
		size: 'md',
	});
}
