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
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import {
	useDeleteInstrumentNote,
	useDeleteStrategyNote,
	useGetByUserInstrumentAll,
	useGetByUserStrategyAll,
	useUpdateInstrumentNote,
	useUpdateStrategyNote,
} from '@/entities/note';
import { useStoredPersonalNotesQuery } from '@/features/note';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import type { NotesSourceFilter } from '../model/note-filters';

import {
	deleteApiNoteFromCache,
	setApiNoteTextInCache,
} from '../model/api-note-cache';
import { getApiPersonalNotes } from '../model/api-notes';
import {
	type DraftedPersonalNote,
	getApiSourceId,
	mergeApiNotesWithDrafts,
} from '../model/note-drafts';
import {
	getFilteredNotes,
	getNotesSummary,
} from '../model/note-filters';
import { NoteCard } from './note-card';
import { NotesControls } from './notes-controls';
import cls from './notes-overview.module.css';

export function NotesOverview() {
	const queryClient = useQueryClient();
	const [searchQuery, setSearchQuery] = useState('');
	const [sourceFilter, setSourceFilter] = useState<NotesSourceFilter>('all');
	const storedNotesQuery = useStoredPersonalNotesQuery();
	const instrumentNotesQuery = useGetByUserInstrumentAll();
	const strategyNotesQuery = useGetByUserStrategyAll();
	const updateInstrumentNoteMutation = useUpdateInstrumentNote();
	const updateStrategyNoteMutation = useUpdateStrategyNote();
	const deleteInstrumentNoteMutation = useDeleteInstrumentNote();
	const deleteStrategyNoteMutation = useDeleteStrategyNote();
	const apiNotes = useMemo(
		() => getApiPersonalNotes({
			instrumentNotes: instrumentNotesQuery.data?.data ?? [],
			strategyNotes: strategyNotesQuery.data?.data ?? [],
		}),
		[instrumentNotesQuery.data?.data, strategyNotesQuery.data?.data],
	);
	const notes = useMemo(
		() => mergeApiNotesWithDrafts({
			apiNotes,
			storedNotes: storedNotesQuery.data ?? [],
		}),
		[apiNotes, storedNotesQuery.data],
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

	function updateNote(
		note: DraftedPersonalNote,
		text: string,
		onSuccess: () => void,
	) {
		const sourceId = getApiSourceId(note.source.id);

		if (sourceId === null) {
			return;
		}

		const data = { noteText: text };
		const mutationOptions = {
			onSuccess: () => {
				setApiNoteTextInCache({ queryClient, note, text });
				onSuccess();
			},
		};

		if (note.source.type === 'stock') {
			updateInstrumentNoteMutation.mutate(
				{ idInstrument: sourceId, data },
				mutationOptions,
			);
			return;
		}

		updateStrategyNoteMutation.mutate(
			{ idStrategy: sourceId, data },
			mutationOptions,
		);
	}

	function deleteNote(note: DraftedPersonalNote, onSuccess: () => void) {
		const sourceId = getApiSourceId(note.source.id);

		if (sourceId === null) {
			return;
		}

		if (note.source.type === 'stock') {
			deleteInstrumentNoteMutation.mutate(
				{ idInstrument: sourceId },
				{
					onSuccess: () => {
						deleteApiNoteFromCache({ queryClient, note });
						onSuccess();
					},
				},
			);
			return;
		}

		deleteStrategyNoteMutation.mutate(
			{ idStrategy: sourceId },
			{
				onSuccess: () => {
					deleteApiNoteFromCache({ queryClient, note });
					onSuccess();
				},
			},
		);
	}

	return (
		<>
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
