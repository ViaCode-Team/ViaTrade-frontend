import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';

import type { TradeResponse } from '@/shared/api';

import { useDeleteUserTrade } from '@/entities/trade';

type DeleteTradeButtonProps = {
	trade: TradeResponse;
};

export function DeleteTradeButton({ trade }: DeleteTradeButtonProps) {
	const { mutate: deleteTrade, isPending } = useDeleteUserTrade();

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Удаление сделки',
			centered: true,
			withCloseButton: false,
			children: 'Вы уверены, что хотите удалить эту сделку? Это действие необратимо.',
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			confirmProps: { color: 'red', loading: isPending },

			onConfirm: () => {
				deleteTrade(
					{ id: trade.id },
					{

					},
				);
			},
		});

	return (
		<Tooltip label='Удалить сделку'>
			<ActionIcon
				color='red'
				variant='subtle'
				onClick={openDeleteModal}
				loading={isPending}
				aria-label='Удалить сделку'
			>
				<IconTrash size={16} />
			</ActionIcon>
		</Tooltip>
	);
}
