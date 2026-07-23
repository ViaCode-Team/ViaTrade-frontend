import type { ReactNode } from 'react';

import { Center, Flex, Pagination } from '@mantine/core';

import type { PaginationConfig } from '@/shared/model';

import { CONTENT_GRID_SPACING } from '@/shared/model';

type NotesListProps<T extends { id: number | string }> = {
	notes: T[];
	renderNote: (note: T) => ReactNode;
	pagination?: PaginationConfig;
};

export function NotesList<T extends { id: number | string }>({
	notes,
	renderNote,
	pagination,
}: NotesListProps<T>) {
	return (
		<Flex direction='column' gap={CONTENT_GRID_SPACING}>
			<Flex direction='column' component='ul' gap={CONTENT_GRID_SPACING}>
				{notes.map((note) => (
					<li key={note.id}>{renderNote(note)}</li>
				))}
			</Flex>

			{pagination && (
				<Center>
					<Pagination
						total={pagination.totalPages}
						value={pagination.page}
						onChange={pagination.onPageChange}
					/>
				</Center>
			)}
		</Flex>
	);
}
