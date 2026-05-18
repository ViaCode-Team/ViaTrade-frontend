import {
	ActionIcon,
	Badge,
	Box,
	Group,
	Stack,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import type { StoredPersonalNote } from '@/entities/note';

import cls from '../notes-page.module.css';

type NoteCardHeaderProps = {
	note: StoredPersonalNote;
	onDelete: () => void;
};

export function NoteCardHeader({
	note,
	onDelete,
}: NoteCardHeaderProps) {
	return (
		<Stack gap='xs'>
			<Group justify='space-between' gap='sm' wrap='nowrap'>
				<Badge variant='default' size='lg' autoContrast>
					{getSourceLabel(note.source.type)}
				</Badge>

				<Group gap='xs' className={cls.noteActions}>
					<Tooltip label='Удалить заметку'>
						<ActionIcon
							variant='subtle'
							color='red'
							size='lg'
							aria-label='Удалить заметку'
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								onDelete();
							}}
						>
							<IconTrash size={20} />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Group>

			<Box>
				<Title order={2}>
					{note.source.label}
				</Title>

				{note.source.description && (
					<Text c='dimmed' lineClamp={1}>
						{note.source.description}
					</Text>
				)}
			</Box>
		</Stack>
	);
}

function getSourceLabel(sourceType: StoredPersonalNote['source']['type']) {
	return sourceType === 'stock' ? 'Акция' : 'Стратегия';
}
