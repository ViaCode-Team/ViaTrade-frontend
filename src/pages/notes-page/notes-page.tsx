import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { NotesOverviewWidget } from '@/widgets/notes-overview-widget';

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
				<NotesOverviewWidget />
			</Section>
		</>
	);
}
