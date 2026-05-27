import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import { useRemindContext } from '@/entities/remind';

type RemindCardActionsProps = {
	remindId: string;
};

export function RemindCardActions({ remindId }: RemindCardActionsProps) {
	const { onRemindDelete } = useRemindContext();

	return (
		<>
			<Tooltip label='Удалить напоминание'>
				<ActionIcon
					variant='subtle'
					color='red'
					size='md'
					aria-label='Удалить напоминание'
					onClick={() => {
						onRemindDelete(remindId);
					}}
				>
					<IconTrash size={18} />
				</ActionIcon>
			</Tooltip>

		</>
	);
}
