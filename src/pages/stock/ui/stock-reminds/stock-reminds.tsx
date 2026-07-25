import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import type { Stock } from '@/entities/stock';

import { RemindsControls } from '@/features/remind/filter-reminds';
import { useCreateRemind } from '@/features/remind/manage-reminds';
import { brandGradient } from '@/shared/lib/theme';

import { StockRemindsListBoundary } from './stock-reminds-list';

type StockRemindsProps = {
	stock: Stock;
};

export function StockReminds({ stock }: StockRemindsProps) {
	const { createRemind, isPending } = useCreateRemind();

	const handleAddClick = () => {
		createRemind(stock.instrumentId);
	};

	const actionSlot = (
		<Tooltip label='Добавить напоминание'>
			<ActionIcon
				variant='gradient'
				gradient={brandGradient}
				size='input-sm'
				aria-label='Добавить напоминание'
				onClick={handleAddClick}
				loading={isPending}
			>
				<IconPlus size={18} />
			</ActionIcon>
		</Tooltip>
	);

	return (
		<Stack>
			<RemindsControls actionSlot={actionSlot} instrumentId={stock.instrumentId} />
			<StockRemindsListBoundary instrumentId={stock.instrumentId} />
		</Stack>
	);
}
