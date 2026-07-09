import type { ReactNode } from 'react';

import { Flex } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model';

export type NotesListProps<T extends { id: number | string }> = {
	notes: T[];
	noteSlot: (note: T) => ReactNode;
};

export function NotesList<T extends { id: number | string }>({
	notes,
	noteSlot,
}: NotesListProps<T>) {
	return (
		<Flex
			direction='column'
			component='ul'
			gap={CONTENT_GRID_SPACING}
		>
			{notes.map((note) => (
				<li key={note.id}>
					{noteSlot(note)}
				</li>
			))}
		</Flex>
	);
}
