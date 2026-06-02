import {
	Alert,
	Stack,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import { NotesControls } from '@/features/note/filter-notes';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { NotesListBoundary, useNotesList } from '@/widgets/notes-list';

import { NotesStatusBar } from './ui/notes-status-bar';
import { NotesSummary } from './ui/notes-summary';

export function NotesPage() {
	const {
		notes,
		isLoading,
		hasError,
	} = useNotesList();

	const hasNotes = notes.length > 0;

	return (
		<>
			<PageHeader
				title='Заметки'
				description='Ваши заметки по акциям и стратегиям'
			/>

			<Section>
				<NotesSummary />
			</Section>

			<Section header={{ title: 'Список заметок' }}>
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
							<NotesStatusBar />
						)}
					</Stack>

					<NotesListBoundary />
				</Stack>
			</Section>
		</>
	);
}
