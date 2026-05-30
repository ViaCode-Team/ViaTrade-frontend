import {
	Alert,
	Stack,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import { useNotesOverview } from '../lib/use-notes-overview';
import { NotesControls } from './notes-controls';
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
		searchQuery,
		sourceFilter,
		setSearchQuery,
		setSourceFilter,
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
						searchQuery={searchQuery}
						sourceFilter={sourceFilter}
						disabled={!hasNotes}
						isLoading={isLoading}
						onSearchQueryChange={setSearchQuery}
						onSourceFilterChange={setSourceFilter}
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
