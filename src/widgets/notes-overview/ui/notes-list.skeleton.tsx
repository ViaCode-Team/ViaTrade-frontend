import { Flex } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import { NoteCardSkeleton } from './note-card.skeleton';
import cls from './notes-overview.module.css';

export function NotesListSkeleton() {
	return (
		<Flex
			direction='column'
			component='ul'
			gap={CONTENT_GRID_SPACING}
		>
			{createSkeletons(3).map((skeleton) => (
				<li key={skeleton.id} className={cls.item}>
					<NoteCardSkeleton />
				</li>
			))}
		</Flex>
	);
}
