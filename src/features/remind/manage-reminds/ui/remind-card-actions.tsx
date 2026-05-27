import { ActionIcon, Tooltip } from '@mantine/core';
import { IconCopy, IconEraser, IconTrash } from '@tabler/icons-react';

import { useRemindContext } from '@/entities/remind';

type RemindCardActionsProps = {
	remindId: string;
};

export function RemindCardActions({ remindId }: RemindCardActionsProps) {
	const { onRemindDuplicate, onRemindClearText, onRemindDelete } = useRemindContext();

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

			<Tooltip label='Дублировать напоминание'>
				<ActionIcon
					variant='subtle'
					color='gray'
					size='md'
					aria-label='Дублировать напоминание'
					onClick={() => {
						onRemindDuplicate(remindId);
					}}
				>
					<IconCopy size={18} />
				</ActionIcon>
			</Tooltip>

			<Tooltip label='Очистить текст'>
				<ActionIcon
					variant='subtle'
					color='gray'
					size='md'
					aria-label='Очистить текст напоминания'
					onClick={() => {
						onRemindClearText(remindId);
					}}
				>
					<IconEraser size={18} />
				</ActionIcon>
			</Tooltip>
		</>
	);
}
