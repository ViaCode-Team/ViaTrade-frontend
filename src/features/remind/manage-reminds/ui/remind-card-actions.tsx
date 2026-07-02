import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import { getGetAllByUserQueryKey, getGetRemindStatisticsQueryKey, useDelete } from '@/entities/remind';

type RemindCardActionsProps = {
	remindId: string;
};

export function RemindCardActions({ remindId }: RemindCardActionsProps) {
	const queryClient = useQueryClient();
	const deleteRemindMutation = useDelete();

	return (
		<>
			<Tooltip label='Удалить напоминание'>
				<ActionIcon
					variant='subtle'
					color='red'
					size='md'
					aria-label='Удалить напоминание'
					onClick={() => {
						deleteRemindMutation.mutate({ remindId: Number(remindId) }, {
							onSuccess: () => {
								queryClient.invalidateQueries({ queryKey: getGetRemindStatisticsQueryKey() });

								const updater = (oldData: any) => {
									if (!oldData)
										return oldData;
									return {
										...oldData,
										data: oldData.data.filter((r: any) => r.id !== Number(remindId)),
									};
								};

								queryClient.setQueriesData({ queryKey: getGetAllByUserQueryKey() }, updater);
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
