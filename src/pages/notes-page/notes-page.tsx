import { Stack } from '@mantine/core';

import { NotesControls } from '@/features/note/filter-notes';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { NotesList } from '@/widgets/notes-list';

import { NotesStatusBar } from './ui/notes-status-bar';
import { NotesSummary } from './ui/notes-summary';

export function NotesPage() {
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
					<Stack gap='xs'>
						<NotesControls isLoading={false} />
						<NotesStatusBar />
					</Stack>

					<NotesList />
				</Stack>
			</Section>
		</>
	);
}
