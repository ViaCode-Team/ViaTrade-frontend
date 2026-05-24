import { PageHeader } from '@/shared/ui/page-header';
import { NotesOverview } from '@/widgets/notes-overview';

export function NotesPage() {
	return (
		<>
			<PageHeader
				title='Заметки'
				description='Единый список личных заметок по акциям и стратегиям.'
			/>

			<NotesOverview />
		</>
	);
}
