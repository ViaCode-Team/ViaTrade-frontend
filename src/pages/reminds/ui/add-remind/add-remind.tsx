import {
	Button,
	Group,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from 'react';

import { mapTradeCodeToStock } from '@/entities/stock';
import { useGetStockCodesSuspense } from '@/entities/trade-code';
import { useCreateRemind } from '@/features/remind/manage-reminds';

export function AddRemind() {
	const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
	const { data: stocksResponse } = useGetStockCodesSuspense({ page: 1, pageSize: 100 });
	const stocks = stocksResponse.data.items.map(mapTradeCodeToStock);
	const { createRemind, isPending } = useCreateRemind();

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

		createRemind(stock.instrumentId, () => modals.closeAll());
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
				disabled={isPending}
			/>

			<Group justify='flex-end' mt='md'>
				<Button variant='default' onClick={() => modals.closeAll()} disabled={isPending}>
					Отмена
				</Button>
				<Button onClick={handleAdd} disabled={!selectedStockId || isPending} loading={isPending}>
					Создать
				</Button>
			</Group>
		</Stack>
	);
}
