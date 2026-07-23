import { useQueryClient } from '@tanstack/react-query';

import {
	useAddUserInstrumentNote,
	useAddUserStrategyNote,
	useDeleteUserInstrumentNote,
	useDeleteUserStrategyNote,
	useUpdateUserInstrumentNote,
	useUpdateUserStrategyNote,
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

	const createInstrumentNoteMutation = useAddUserInstrumentNote();
	const createStrategyNoteMutation = useAddUserStrategyNote();
	const updateInstrumentNoteMutation = useUpdateUserInstrumentNote();
	const updateStrategyNoteMutation = useUpdateUserStrategyNote();
	const deleteInstrumentNoteMutation = useDeleteUserInstrumentNote();
	const deleteStrategyNoteMutation = useDeleteUserStrategyNote();

	function isNoteSaving(note: DraftedPersonalNote) {
		const sourceId = getApiSourceId(note.source.id);
		if (sourceId === null) {
			return false;
		}

		if (note.source.type === 'stock') {
			return (updateInstrumentNoteMutation.isPending && updateInstrumentNoteMutation.variables?.tradeCodeId === sourceId)
				|| (createInstrumentNoteMutation.isPending && createInstrumentNoteMutation.variables?.tradeCodeId === sourceId);
		}

		return (updateStrategyNoteMutation.isPending && updateStrategyNoteMutation.variables?.strategyId === sourceId)
			|| (createStrategyNoteMutation.isPending && createStrategyNoteMutation.variables?.strategyId === sourceId);
	}

	function isNoteDeleting(note: DraftedPersonalNote) {
		const sourceId = getApiSourceId(note.source.id);
		if (sourceId === null) {
			return false;
		}

		if (note.source.type === 'stock') {
			return deleteInstrumentNoteMutation.isPending && deleteInstrumentNoteMutation.variables?.tradeCodeId === sourceId;
		}

		return deleteStrategyNoteMutation.isPending && deleteStrategyNoteMutation.variables?.strategyId === sourceId;
	}

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
					{ tradeCodeId: sourceId, data },
					mutationOptions,
				);
			}
			else {
				updateInstrumentNoteMutation.mutate(
					{ tradeCodeId: sourceId, data },
					mutationOptions,
				);
			}
			return;
		}

		if (isNewNote) {
			createStrategyNoteMutation.mutate(
				{ strategyId: sourceId, data },
				mutationOptions,
			);
		}
		else {
			updateStrategyNoteMutation.mutate(
				{ strategyId: sourceId, data },
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
				{ tradeCodeId: sourceId },
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
			{ strategyId: sourceId },
			{
				onSuccess: () => {
					deleteApiNoteFromCache({ queryClient, note });
					onSuccess();
				},
			},
		);
	}

	return {
		isNoteSaving,
		isNoteDeleting,
		updateNote,
		deleteNote,
	};
}
