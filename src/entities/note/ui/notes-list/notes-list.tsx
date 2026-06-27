import type { ReactNode } from 'react';

import { Flex } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model';
import { AppEmptyState } from '@/shared/ui/app-empty-state';

import cls from './notes-list.module.css';

export { NotesListSkeleton } from './notes-list.skeleton';

export type NotesListProps<T extends { id: number | string }> = {
	notes: T[];
	hasAnyNotes: boolean;
	noteSlot: (note: T) => ReactNode;
};

export function NotesList<T extends { id: number | string }>({
	notes,
	hasAnyNotes,
	noteSlot,
}: NotesListProps<T>) {
	if (!hasAnyNotes) {
		return (
			<AppEmptyState
				title='Нет заметок'
				description='Оставляйте заметки к акциям, они появятся здесь.'
			/>
		);
	}

	if (notes.length === 0) {
		return (
			<AppEmptyState
				title='Ничего не найдено'
				description='Попробуйте изменить параметры поиска или фильтры.'
			/>
		);
	}

	return (
		<Flex
			direction='column'
			component='ul'
			gap={CONTENT_GRID_SPACING}
		>
			{notes.map((note) => (
				<li key={note.id} className={cls.item}>
					{noteSlot(note)}
				</li>
			))}
		</Flex>
	);
}
