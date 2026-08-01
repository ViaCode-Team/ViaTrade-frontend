import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import {
	getGetRemindersQueryKey,
	getGetReminderStatisticsQueryKey,
	type getRemindersResponseSuccess,
	useDeleteReminder,
} from '@/entities/reminder';

type DeleteRemindButtonProps = {
	id: string;
};

export function DeleteRemindButton({ id }: DeleteRemindButtonProps) {
	const queryClient = useQueryClient();
	const deleteRemindMutation = useDeleteReminder();

	const deleteRemind = () => {
		deleteRemindMutation.mutate({ reminderId: Number(id) }, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: getGetReminderStatisticsQueryKey() });

				const updater = (oldData: getRemindersResponseSuccess | undefined) => {
					if (!oldData)
						return oldData;
					return {
						...oldData,
						data: {
							...oldData.data,
							items: oldData.data.items.filter((r) => r.id !== Number(id)),
						},
					};
				};

				queryClient.setQueriesData({ queryKey: getGetRemindersQueryKey() }, updater);
				queryClient.setQueriesData(
					{ predicate: (query) => typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/v1/instruments/') },
					updater,
				);
			},
		});
	};

	const openDeleteModal = () => {
		modals.openConfirmModal({
			title: 'Удаление напоминания',
			centered: true,
			children: 'Вы уверены, что хотите удалить напоминание? Это действие необратимо.',
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			confirmProps: { color: 'red', loading: deleteRemindMutation.isPending },
			onConfirm: deleteRemind,
		});
	};

	return (
		<>
			<Tooltip label='Удалить напоминание'>
				<ActionIcon
					variant='subtle'
					color='red'
					size='md'
					aria-label='Удалить напоминание'
					onClick={openDeleteModal}
					loading={deleteRemindMutation.isPending}
				>
					<IconTrash size={18} />
				</ActionIcon>
			</Tooltip>
		</>
	);
}
