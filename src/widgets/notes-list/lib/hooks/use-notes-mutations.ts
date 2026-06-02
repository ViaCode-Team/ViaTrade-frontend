import { useQueryClient } from '@tanstack/react-query';

import {
	useCreateInstrumentNote,
	useCreateStrategyNote,
	useDeleteInstrumentNote,
	useDeleteStrategyNote,
	useUpdateInstrumentNote,
	useUpdateStrategyNote,
} from '@/entities/note';
import {
	type DraftedPersonalNote,
	getApiSourceId,
} from '@/features/note/manage-note';

import {
	deleteApiNoteFromCache,
	setApiNoteTextInCache,
} from '../../model/api-note-cache';

export function useNotesMutations() {
	const queryClient = useQueryClient();

	const createInstrumentNoteMutation = useCreateInstrumentNote();
	const createStrategyNoteMutation = useCreateStrategyNote();
	const updateInstrumentNoteMutation = useUpdateInstrumentNote();
	const updateStrategyNoteMutation = useUpdateStrategyNote();
	const deleteInstrumentNoteMutation = useDeleteInstrumentNote();
	const deleteStrategyNoteMutation = useDeleteStrategyNote();

	const isSaving = updateInstrumentNoteMutation.isPending
		|| updateStrategyNoteMutation.isPending
		|| createInstrumentNoteMutation.isPending
		|| createStrategyNoteMutation.isPending;
	const isDeleting = deleteInstrumentNoteMutation.isPending
		|| deleteStrategyNoteMutation.isPending;

	function updateNote(
		note: DraftedPersonalNote,
		text: string,
		onSuccess: () => void,
	) {
		const sourceId = getApiSourceId(note.source.id);

		if (sourceId === null) {
			return;
		}

		const isNewNote = note.isLocalOnly;
		const data = { noteText: text };
		const mutationOptions = {
			onSuccess: () => {
				setApiNoteTextInCache({ queryClient, note, text });
				onSuccess();
			},
		};

		if (note.source.type === 'stock') {
			if (isNewNote) {
				createInstrumentNoteMutation.mutate(
					{ idInstrument: sourceId, data },
					mutationOptions,
				);
			}
			else {
				updateInstrumentNoteMutation.mutate(
					{ idInstrument: sourceId, data },
					mutationOptions,
				);
			}
			return;
		}

		if (isNewNote) {
			createStrategyNoteMutation.mutate(
				{ idStrategy: sourceId, data },
				mutationOptions,
			);
		}
		else {
			updateStrategyNoteMutation.mutate(
				{ idStrategy: sourceId, data },
				mutationOptions,
			);
		}
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

	return {
		isSaving,
		isDeleting,
		updateNote,
		deleteNote,
	};
}
