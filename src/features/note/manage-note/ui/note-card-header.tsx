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
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router';

import type { StoredPersonalNote } from '@/entities/note';

import cls from './note-card.module.css';

type NoteCardHeaderProps = {
	note: StoredPersonalNote;
	isDeleting?: boolean;
	onDelete: () => void;
};

export function NoteCardHeader({
	note,
	isDeleting,
	onDelete,
}: NoteCardHeaderProps) {
	const openDeleteModal = () => {
		modals.openConfirmModal({
			title: 'Удаление заметки',
			centered: true,
			children: 'Вы уверены, что хотите удалить заметку? Это действие необратимо.',
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			confirmProps: { color: 'red', loading: isDeleting },
			onConfirm: onDelete,
		});
	};

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
							loading={isDeleting}
							disabled={isDeleting}
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								openDeleteModal();
							}}
						>
							<IconTrash size={20} />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Group>

			<Box
				component={RouterLink}
				to={note.source.path}
				className={cls.sourceLink}
			>
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
