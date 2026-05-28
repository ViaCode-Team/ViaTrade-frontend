import { ActionIcon } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import type { Trade } from '@/shared/api/types/gen/trade';

import { getGetByUserQueryKey, useDeleteTrade } from '@/entities/statistic/api/gen';

type DeleteTradeButtonProps = {
	trade: Trade;
};

export function DeleteTradeButton({ trade }: DeleteTradeButtonProps) {
	const queryClient = useQueryClient();
	const { mutate: deleteTrade, isPending } = useDeleteTrade();

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Удаление сделки',
			centered: true,
			closeOnClickOutside: false,
			closeOnEscape: false,
			children: 'Вы уверены, что хотите удалить эту сделку? Это действие необратимо.',
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			confirmProps: { color: 'red', loading: isPending },
			onConfirm: () => {
				deleteTrade(
					{ id: trade.id },
					{
						onSuccess: () => {
							notifications.show({
								title: 'Успех',
								message: 'Сделка удалена',
								color: 'green',
							});
							queryClient.invalidateQueries({ queryKey: getGetByUserQueryKey() });
						},
						onError: () => {
							notifications.show({
								title: 'Ошибка',
								message: 'Не удалось удалить сделку',
								color: 'red',
							});
						},
					},
				);
			},
		});

	return (
		<ActionIcon
			color='red'
			variant='subtle'
			onClick={openDeleteModal}
			loading={isPending}
			aria-label='Удалить сделку'
		>
			<IconTrash size={16} />
		</ActionIcon>
	);
}
