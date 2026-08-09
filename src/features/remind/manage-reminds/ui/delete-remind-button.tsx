import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import { getGetInstrumentRemindersQueryKey } from '@/entities/instrument';
import {
	getGetRemindersQueryKey,
	type getRemindersResponseSuccess,
	useDeleteReminder,
} from '@/entities/reminder';

type DeleteRemindButtonProps = {
	id: string;
	instrumentId?: number;
};

type OpenDeleteReminderConfirmationOptions = {
	isPending: boolean;
	onConfirm: () => void;
};

function openDeleteReminderConfirmation({ isPending, onConfirm }: OpenDeleteReminderConfirmationOptions) {
	modals.openConfirmModal({
		title: 'Удалить напоминание?',
		centered: true,
		children: 'Напоминание будет удалено без возможности восстановления.',
		labels: { confirm: 'Удалить', cancel: 'Отмена' },
		confirmProps: { color: 'red', loading: isPending },
		onConfirm,
	});
}

export function DeleteRemindButton({ id, instrumentId }: DeleteRemindButtonProps) {
	const queryClient = useQueryClient();
	const deleteRemindMutation = useDeleteReminder();

	const deleteRemind = () => {
		deleteRemindMutation.mutate({ reminderId: Number(id) }, {
			onSuccess: () => {
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

				if (instrumentId !== undefined)
					queryClient.setQueriesData({ queryKey: getGetInstrumentRemindersQueryKey(instrumentId) }, updater);
			},
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
					onClick={() => openDeleteReminderConfirmation({
						isPending: deleteRemindMutation.isPending,
						onConfirm: deleteRemind,
					})}
					loading={deleteRemindMutation.isPending}
				>
					<IconTrash size={18} />
				</ActionIcon>
			</Tooltip>
		</>
	);
}
