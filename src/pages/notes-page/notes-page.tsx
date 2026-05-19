import {
	Alert,
	Card,
	Flex,
	Loader,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import {
	IconAlertTriangle,
	IconNotesOff,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import {
	useDeleteInstrumentNote,
	useDeleteStrategyNote,
	useGetByUserInstrumentAll,
	useGetByUserStrategyAll,
	useUpdateInstrumentNote,
	useUpdateStrategyNote,
} from '@/entities/note';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import type {
	NotesSourceFilter,
} from './model/note-filters';

import { getApiPersonalNotes } from './model/api-notes';
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
	const instrumentNotesQuery = useGetByUserInstrumentAll();
	const strategyNotesQuery = useGetByUserStrategyAll();
	const updateInstrumentNoteMutation = useUpdateInstrumentNote();
	const updateStrategyNoteMutation = useUpdateStrategyNote();
	const deleteInstrumentNoteMutation = useDeleteInstrumentNote();
	const deleteStrategyNoteMutation = useDeleteStrategyNote();
	const notes = useMemo(
		() => getApiPersonalNotes({
			instrumentNotes: instrumentNotesQuery.data?.data ?? [],
			strategyNotes: strategyNotesQuery.data?.data ?? [],
		}),
		[instrumentNotesQuery.data?.data, strategyNotesQuery.data?.data],
	);
	const isLoading = instrumentNotesQuery.isLoading || strategyNotesQuery.isLoading;
	const hasError = instrumentNotesQuery.isError
		|| strategyNotesQuery.isError
		|| updateInstrumentNoteMutation.isError
		|| updateStrategyNoteMutation.isError
		|| deleteInstrumentNoteMutation.isError
		|| deleteStrategyNoteMutation.isError;
	const isSaving = updateInstrumentNoteMutation.isPending
		|| updateStrategyNoteMutation.isPending;
	const isDeleting = deleteInstrumentNoteMutation.isPending
		|| deleteStrategyNoteMutation.isPending;

	const filteredNotes = useMemo(
		() => getFilteredNotes({
			notes,
			searchQuery,
			sourceFilter,
		}),
		[notes, searchQuery, sourceFilter],
	);
	const summary = useMemo(() => getNotesSummary(notes), [notes]);

	function updateNote(noteId: string, text: string) {
		const note = notes.find((currentNote) => currentNote.id === noteId);
		const sourceId = getApiSourceId(note?.source.id);

		if (!note || sourceId === null) {
			return;
		}

		const data = { noteText: text };

		if (note.source.type === 'stock') {
			updateInstrumentNoteMutation.mutate({ idInstrument: sourceId, data });
			return;
		}

		updateStrategyNoteMutation.mutate({ idStrategy: sourceId, data });
	}

	function deleteNote(noteId: string) {
		const note = notes.find((currentNote) => currentNote.id === noteId);
		const sourceId = getApiSourceId(note?.source.id);

		if (!note || sourceId === null) {
			return;
		}

		if (note.source.type === 'stock') {
			deleteInstrumentNoteMutation.mutate({ idInstrument: sourceId });
			return;
		}

		deleteStrategyNoteMutation.mutate({ idStrategy: sourceId });
	}

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
					onSearchQueryChange={setSearchQuery}
					onSourceFilterChange={setSourceFilter}
				/>

				{isLoading
					? (
							<LoadingNotesState />
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
								<EmptyNotesState hasNotes={notes.length > 0} />
							)}
			</Stack>
		</>
	);
}

function getApiSourceId(sourceId: string | undefined) {
	const value = Number(sourceId);

	return Number.isInteger(value) && value > 0 ? value : null;
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

function LoadingNotesState() {
	return (
		<Card withBorder p='xl' className={cls.emptyState}>
			<Stack gap='sm' align='center'>
				<Loader size='sm' />
				<Text size='sm' c='dimmed'>
					Заметки загружаются
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
		<Flex p='xl' align='center' justify='center'>
			<Stack gap='sm' align='center'>
				<ThemeIcon size='xl' variant='default'>
					<IconNotesOff size={24} />
				</ThemeIcon>

				<Stack gap={4} align='center'>
					<Title order={3}>
						{hasNotes ? 'По фильтрам ничего не найдено' : 'Заметок пока нет'}
					</Title>
					<Text c='dimmed' ta='center'>
						{hasNotes
							? 'Измените поиск или тип источника.'
							: 'Создайте заметку на странице акции или стратегии, и она появится здесь.'}
					</Text>
				</Stack>
			</Stack>
		</Flex>
	);
}
