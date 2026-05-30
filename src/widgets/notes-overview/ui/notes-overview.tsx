import {
	Alert,
	Stack,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import { NotesControls } from '@/features/note/filter-notes';

import { useNotesOverview } from '../lib/use-notes-overview';
import { NotesList } from './notes-list';
import { NotesListSkeleton } from './notes-list.skeleton';
import { NotesStatusBar } from './notes-status-bar';
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
		updateNote,
		deleteNote,
	} = useNotesOverview();

	const hasNotes = notes.length > 0;

	return (
		<>
			<NotesSummary {...summary} isLoading={isLoading} />

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

				<Stack gap='xs'>
					<NotesControls
						disabled={!hasNotes}
						isLoading={isLoading}
					/>

					{!isLoading && (
						<NotesStatusBar
							notesCount={notes.length}
							filteredNotes={filteredNotes}
						/>
					)}
				</Stack>

				{isLoading
					? (
							<NotesListSkeleton />
						)
					: (
							<NotesList
								filteredNotes={filteredNotes}
								hasNotes={hasNotes}
								isSaving={isSaving}
								isDeleting={isDeleting}
								updateNote={updateNote}
								deleteNote={deleteNote}
							/>
						)}
			</Stack>
		</>
	);
}
