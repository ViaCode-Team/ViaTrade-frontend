import { Flex } from '@mantine/core';

import { NoteCard } from '@/features/note/manage-note';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';

import type { useNotesOverview } from '../lib/use-notes-overview';

import cls from './notes-overview.module.css';

type NotesListProps = {
	filteredNotes: ReturnType<typeof useNotesOverview>['filteredNotes'];
	hasNotes: boolean;
	isSaving: boolean;
	isDeleting: boolean;
	updateNote: ReturnType<typeof useNotesOverview>['updateNote'];
	deleteNote: ReturnType<typeof useNotesOverview>['deleteNote'];
};

export function NotesList({
	filteredNotes,
	hasNotes,
	isSaving,
	isDeleting,
	updateNote,
	deleteNote,
}: NotesListProps) {
	if (filteredNotes.length === 0) {
		return (
			<EmptyState
				title={hasNotes ? 'По фильтрам ничего не найдено' : 'Заметок пока нет'}
				description={hasNotes
					? 'Измените поиск или тип источника.'
					: 'Создайте заметку на странице акции или стратегии, и она появится здесь.'}
			/>
		);
	}

	return (
		<Flex
			direction='column'
			component='ul'
			gap={CONTENT_GRID_SPACING}
		>
			{filteredNotes.map((note) => (
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
