import {
	Alert,
	Flex,
	Stack,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';

import { useNotesOverview } from '../lib/use-notes-overview';
import { NoteCard } from './note-card';
import { NotesControls } from './notes-controls';
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

				<NotesControls
					searchQuery={searchQuery}
					sourceFilter={sourceFilter}
					disabled={!hasNotes}
					isLoading={isLoading}
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
								<>
									<EmptyState
										title={hasNotes ? 'По фильтрам ничего не найдено' : 'Заметок пока нет'}
										description={hasNotes
											? 'Измените поиск или тип источника.'
											: 'Создайте заметку на странице акции или стратегии, и она появится здесь.'}
									/>
								</>
							)}
			</Stack>
		</>
	);
}
