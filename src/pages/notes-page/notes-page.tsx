import {
	Card,
	Flex,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconNotesOff } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import { useStoredPersonalNotes } from '@/entities/note';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import type {
	NotesSortOption,
	NotesSourceFilter,
} from './model/note-filters';

import {
	getFilteredNotes,
	getNotesSummary,
} from './model/note-filters';
import cls from './notes-page.module.css';
import { NoteCard } from './ui/note-card';
import { NotesControls } from './ui/notes-controls';

export function NotesPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [sourceFilter, setSourceFilter] = useState<NotesSourceFilter>('all');
	const [sortOption, setSortOption] = useState<NotesSortOption>('updated-desc');
	const { notes, updateNote, deleteNote } = useStoredPersonalNotes();

	const filteredNotes = useMemo(
		() => getFilteredNotes({
			notes,
			searchQuery,
			sourceFilter,
			sortOption,
		}),
		[notes, searchQuery, sourceFilter, sortOption],
	);
	const summary = useMemo(() => getNotesSummary(notes), [notes]);

	return (
		<>
			<Flex direction='column' gap='xs'>
				<Title order={1}>Заметки</Title>
				<Text c='dimmed'>
					Единый список личных заметок по акциям и стратегиям.
				</Text>
			</Flex>

			<SimpleGrid cols={{ base: 1, xs: 3 }} spacing={CONTENT_GRID_SPACING}>
				<SummaryCard label='Всего' value={summary.total} />
				<SummaryCard label='По акциям' value={summary.stock} />
				<SummaryCard label='По стратегиям' value={summary.strategy} />
			</SimpleGrid>

			<Stack>
				<NotesControls
					searchQuery={searchQuery}
					sourceFilter={sourceFilter}
					sortOption={sortOption}
					onSearchQueryChange={setSearchQuery}
					onSourceFilterChange={setSourceFilter}
					onSortOptionChange={setSortOption}
				/>

				{filteredNotes.length > 0
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

type SummaryCardProps = {
	label: string;
	value: number;
};

function SummaryCard({ label, value }: SummaryCardProps) {
	return (
		<Card withBorder p='md'>
			<Stack gap={4}>
				<Text size='xs' c='dimmed' tt='uppercase' fw={700}>
					{label}
				</Text>
				<Text fw={700} fz='xl'>
					{value}
				</Text>
			</Stack>
		</Card>
	);
}

type EmptyNotesStateProps = {
	hasNotes: boolean;
};

function EmptyNotesState({ hasNotes }: EmptyNotesStateProps) {
	return (
		<Card withBorder p='xl' className={cls.emptyState}>
			<Stack gap='sm' align='center'>
				<Group className={cls.emptyIcon}>
					<IconNotesOff size={26} />
				</Group>

				<Stack gap={4} align='center'>
					<Text fw={700}>
						{hasNotes ? 'По фильтрам ничего не найдено' : 'Заметок пока нет'}
					</Text>
					<Text size='sm' c='dimmed' ta='center'>
						{hasNotes
							? 'Измените поиск или тип источника.'
							: 'Создайте заметку на странице акции или стратегии, и она появится здесь.'}
					</Text>
				</Stack>
			</Stack>
		</Card>
	);
}
