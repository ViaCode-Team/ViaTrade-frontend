import {
	Alert,
	Flex,
	Stack,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import { useNotesOverview } from '../lib/use-notes-overview';
import { NoteCard } from './note-card';
import { NotesControls } from './notes-controls';
import { EmptyNotesState } from './notes-empty-state';
import { NotesListSkeleton } from './notes-list.skeleton';
import cls from './notes-overview.module.css';
import { NotesSummary } from './notes-summary';

export function NotesOverview() {
	const {
		notes,
		filteredNotes,
		summary,
		isLoading,
		hasError,
		isSaving,
		isDeleting,
		searchQuery,
		sourceFilter,
		setSearchQuery,
		setSourceFilter,
		updateNote,
		deleteNote,
	} = useNotesOverview();

	return (
		<>
			<NotesSummary {...summary} />

			<Stack>
				{hasError
					? (
							<Alert
								color='red'
								variant='outline'
								icon={<IconAlertTriangle size={18} />}
							>
								Не удалось синхронизировать заметки с API.
							</Alert>
						)
					: null}

				<NotesControls
					searchQuery={searchQuery}
					sourceFilter={sourceFilter}
					onSearchQueryChange={setSearchQuery}
					onSourceFilterChange={setSourceFilter}
				/>

				{isLoading
					? (
							<NotesListSkeleton />
						)
					: filteredNotes.length > 0
						? (
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
							)
						: (
								<EmptyNotesState hasNotes={notes.length > 0} />
							)}
			</Stack>
		</>
	);
}
