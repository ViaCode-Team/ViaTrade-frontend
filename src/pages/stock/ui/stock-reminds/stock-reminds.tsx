import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import type { Stock } from '@/entities/stock';

import { openCreateRemindModal } from '@/features/remind/create-remind';
import { RemindsControls } from '@/features/remind/filter-reminds';
import { brandGradient } from '@/shared/lib/theme';

import { StockRemindsListBoundary } from './stock-reminds-list';

type StockRemindsProps = {
	stock: Stock;
};

export function StockReminds({ stock }: StockRemindsProps) {
	const actionSlot = (
		<Tooltip label='Добавить напоминание'>
			<ActionIcon
				variant='gradient'
				gradient={brandGradient}
				size='input-sm'
				aria-label='Добавить напоминание'
				onClick={() => openCreateRemindModal({
					id: stock.instrumentId,
					label: `${stock.ticker} — ${stock.name}`,
				})}
			>
				<IconPlus size={18} />
			</ActionIcon>
		</Tooltip>
	);

	return (
		<Stack>
			<RemindsControls actionSlot={actionSlot} />
			<StockRemindsListBoundary instrumentId={stock.instrumentId} />
		</Stack>
	);
}
