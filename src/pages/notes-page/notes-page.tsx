import {
	Alert,
	Stack,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import { NotesControls } from '@/features/note/filter-notes';
import { PageHeader } from '@/shared/ui/page-header';
import { NotesList, useNotesList } from '@/widgets/notes-list';

import { NotesStatusBar } from './ui/notes-status-bar';
import { NotesSummary } from './ui/notes-summary';

export function NotesPage() {
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
		refetch,
	} = useNotesList();

	const hasNotes = notes.length > 0;

	return (
		<>
			<PageHeader
				title='Заметки'
				description='Ваши заметки по акциям и стратегиям'
			/>

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
							onRefresh={refetch}
						/>
					)}
				</Stack>

				<NotesList
					filteredNotes={filteredNotes}
					hasNotes={hasNotes}
					isLoading={isLoading}
					isSaving={isSaving}
					isDeleting={isDeleting}
					updateNote={updateNote}
					deleteNote={deleteNote}
				/>
			</Stack>
		</>
	);
}
