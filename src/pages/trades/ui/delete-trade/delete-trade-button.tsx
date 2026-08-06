import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';

import type { TradeResponse } from '@/shared/api';

import { useDeleteTrade } from '@/entities/trade';

type DeleteTradeButtonProps = {
	trade: TradeResponse;
};

type OpenDeleteTradeConfirmationOptions = {
	isPending: boolean;
	onConfirm: () => void;
};

function openDeleteTradeConfirmation({ isPending, onConfirm }: OpenDeleteTradeConfirmationOptions) {
	modals.openConfirmModal({
		title: 'Удалить сделку?',
		centered: true,
		children: 'Сделка будет удалена без возможности восстановления.',
		labels: { confirm: 'Удалить', cancel: 'Отмена' },
		confirmProps: { color: 'red', loading: isPending },
		onConfirm,
	});
}

export function DeleteTradeButton({ trade }: DeleteTradeButtonProps) {
	const { mutate: deleteTrade, isPending } = useDeleteTrade();

	const handleDeleteTrade = () => {
		deleteTrade({ tradeId: trade.id });
	};

	return (
		<Tooltip label='Удалить сделку'>
			<ActionIcon
				color='red'
				variant='subtle'
				onClick={() => openDeleteTradeConfirmation({ isPending, onConfirm: handleDeleteTrade })}
				loading={isPending}
				aria-label='Удалить сделку'
			>
				<IconTrash size={16} />
			</ActionIcon>
		</Tooltip>
	);
}
