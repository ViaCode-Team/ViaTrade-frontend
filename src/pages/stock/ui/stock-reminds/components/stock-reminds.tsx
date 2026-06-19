import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';

import type { Stock } from '@/entities/stock';

import { useCreateInstrumentRemind } from '@/entities/remind';
import { RemindsControls } from '@/features/remind/filter-reminds';
import { RemindStatusBarBoundary } from '@/features/remind/manage-reminds';
import { brandGradient } from '@/shared/lib/theme';

import { StockRemindsListBoundary } from './stock-reminds-list';

type StockRemindsProps = {
	stock: Stock;
};

export function StockReminds({ stock }: StockRemindsProps) {
	const createRemindMutation = useCreateInstrumentRemind();

	const handleAddClick = () => {
		const now = new Date();
		now.setSeconds(0, 0);
		now.setHours(now.getHours() + 3);

		createRemindMutation.mutate({
			idInstrument: stock.instrumentId,
			data: {
				textRemind: 'Новое напоминание',
				dateTime: dayjs(now).format('YYYY-MM-DDTHH:mm:ss'),
			},
		});
	};

	const actionSlot = (
		<Tooltip label='Добавить напоминание'>
			<ActionIcon
				variant='gradient'
				gradient={brandGradient}
				size='input-sm'
				aria-label='Добавить напоминание'
				onClick={handleAddClick}
				loading={createRemindMutation.isPending}
			>
				<IconPlus size={18} />
			</ActionIcon>
		</Tooltip>
	);

	return (
		<Stack>
			<Stack gap='xs'>
				<RemindsControls actionSlot={actionSlot} instrumentId={stock.instrumentId} />
				<RemindStatusBarBoundary instrumentId={stock.instrumentId} />
			</Stack>
			<StockRemindsListBoundary instrumentId={stock.instrumentId} />
		</Stack>
	);
}
