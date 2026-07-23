import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import {
	getGetReminderStatisticsQueryKey,
	getGetUserRemindersQueryKey,
	type getUserRemindersResponseSuccess,
	useDeleteUserReminder,
} from '@/entities/remind';

type DeleteRemindButtonProps = {
	id: string;
};

export function DeleteRemindButton({ id }: DeleteRemindButtonProps) {
	const queryClient = useQueryClient();
	const deleteRemindMutation = useDeleteUserReminder();

	return (
		<>
			<Tooltip label='Удалить напоминание'>
				<ActionIcon
					variant='subtle'
					color='red'
					size='md'
					aria-label='Удалить напоминание'
					onClick={() => {
						deleteRemindMutation.mutate({ id: Number(id) }, {
							onSuccess: () => {
								queryClient.invalidateQueries({ queryKey: getGetReminderStatisticsQueryKey() });

								const updater = (oldData: getUserRemindersResponseSuccess | undefined) => {
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

								queryClient.setQueriesData({ queryKey: getGetUserRemindersQueryKey() }, updater);
								queryClient.setQueriesData(
									{ predicate: (query) => typeof query.queryKey[0] === 'string' && query.queryKey[0].startsWith('/api/TradeRemind/byuser/instrument/') },
									updater,
								);
							},
						});
					}}
					loading={deleteRemindMutation.isPending}
				>
					<IconTrash size={18} />
				</ActionIcon>
			</Tooltip>
		</>
	);
}
