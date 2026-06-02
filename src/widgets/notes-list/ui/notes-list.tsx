import { Flex } from '@mantine/core';

import type { DraftedPersonalNote } from '@/features/note/manage-note';

import { getFilteredNotes, useNotesControls } from '@/features/note/filter-notes';
import { NoteCard } from '@/features/note/manage-note';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useNotesMutations } from '../lib/hooks/use-notes-mutations';
import { usePersonalNotes } from '../lib/hooks/use-personal-notes';
import cls from './notes-list.module.css';
import { NotesListSkeleton } from './notes-list.skeleton';

type NotesListProps = {
	notes?: DraftedPersonalNote[];
};

export function NotesList({ notes: providedNotes }: NotesListProps = {}) {
	const { notes: allNotes } = usePersonalNotes();
	const { filters } = useNotesControls();
	const { isSaving, isDeleting, updateNote, deleteNote } = useNotesMutations();

	const displayNotes = providedNotes ?? getFilteredNotes({
		notes: allNotes,
		searchQuery: filters.searchQuery,
		sourceFilter: filters.sourceFilter,
	});

	const hasNotes = providedNotes ? providedNotes.length > 0 : allNotes.length > 0;

	if (!hasNotes) {
		return (
			<EmptyState
				title='Нет заметок'
				description='Оставляйте заметки к акциям, они появятся здесь.'
			/>
		);
	}

	if (displayNotes.length === 0) {
		return (
			<EmptyState
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
			{displayNotes.map((note) => (
				<li key={note.id} className={cls.item}>
					<NoteCard
						note={note}
						isSaving={isSaving}
						isDeleting={isDeleting}
						onSave={updateNote}
						onDelete={deleteNote}
					/>
				</li>
			))}
		</Flex>
	);
}
export const NotesWorkspaceBoundary = withQueryBoundary(NotesList, {
	suspenseProps: { fallback: <NotesListSkeleton /> },
});
