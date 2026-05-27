import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import { useDeleteRemind } from '@/entities/remind/api/gen';

type RemindCardActionsProps = {
	remindId: string;
};

export function RemindCardActions({ remindId }: RemindCardActionsProps) {
	const deleteRemindMutation = useDeleteRemind();

	return (
		<>
			<Tooltip label='Удалить напоминание'>
				<ActionIcon
					variant='subtle'
					color='red'
					size='md'
					aria-label='Удалить напоминание'
					onClick={() => {
						deleteRemindMutation.mutate({ redindId: Number(remindId) });
					}}
					loading={deleteRemindMutation.isPending}
				>
					<IconTrash size={18} />
				</ActionIcon>
			</Tooltip>
		</>
	);
}
