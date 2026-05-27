/* eslint-disable react-refresh/only-export-components */
import {
	Button,
	Group,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from 'react';

import type { RemindSource } from '@/entities/remind';

import { mockStocks } from '@/entities/stock';

type OpenAddRemindModalParams = {
	onAdd: (source: RemindSource) => void;
};

export function openAddRemindModal({ onAdd }: OpenAddRemindModalParams) {
	modals.open({
		title: 'Выбор актива',
		children: <AddRemindModalContent onAdd={onAdd} />,
		size: 'md',
	});
}

function AddRemindModalContent({ onAdd }: OpenAddRemindModalParams) {
	const [selectedStockId, setSelectedStockId] = useState<string | null>(null);

	const stockSelectData = mockStocks.map((stock) => ({
		value: stock.id,
		label: `${stock.ticker} — ${stock.name}`,
	}));

	const handleAdd = () => {
		if (!selectedStockId) {
			return;
		}

		const stock = mockStocks.find((s) => s.id === selectedStockId);

		if (!stock) {
			return;
		}

		const source: RemindSource = {
			type: 'stock',
			id: stock.id,
			label: stock.name,
		};

		onAdd(source);
		modals.closeAll();
	};

	return (
		<Stack gap='md'>
			<Text size='sm' c='dimmed'>
				Выберите акцию, к которой будет привязано напоминание.
			</Text>

			<Select
				label='Акция'
				placeholder='Выберите акцию...'
				data={stockSelectData}
				value={selectedStockId}
				onChange={setSelectedStockId}
				searchable
				nothingFoundMessage='Акции не найдены'
				withAsterisk
			/>

			<Group justify='flex-end' mt='md'>
				<Button variant='default' onClick={() => modals.closeAll()}>
					Отмена
				</Button>
				<Button onClick={handleAdd} disabled={!selectedStockId}>
					Создать
				</Button>
			</Group>
		</Stack>
	);
}
