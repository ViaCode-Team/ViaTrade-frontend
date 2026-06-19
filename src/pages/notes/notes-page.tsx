import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { NotesOverview } from '@/widgets/notes-overview';

import { NotesSummaryBoundary } from './ui/notes-summary';


export function NotesPage() {
	return (
		<>
			<PageHeader
				title='Заметки'
				description='Ваши заметки по акциям и стратегиям'
			/>

			<Section>
				<NotesSummaryBoundary />
			</Section>

			<Section header={{ title: 'Список заметок' }}>
				<NotesOverview />
			</Section>
		</>
	);
}
