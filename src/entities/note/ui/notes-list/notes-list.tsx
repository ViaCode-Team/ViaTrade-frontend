import type { ReactNode } from 'react';

import { Flex } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model';

type NotesListProps<T extends { id: number | string }> = {
	notes: T[];
	renderNote: (note: T) => ReactNode;
};

export function NotesList<T extends { id: number | string }>({
	notes,
	renderNote,
}: NotesListProps<T>) {
	return (
		<Flex
			direction='column'
			component='ul'
			gap={CONTENT_GRID_SPACING}
		>
			{notes.map((note) => (
				<li key={note.id}>
					{renderNote(note)}
				</li>
			))}
		</Flex>
	);
}
