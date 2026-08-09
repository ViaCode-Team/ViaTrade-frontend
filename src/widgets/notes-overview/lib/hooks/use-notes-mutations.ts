import { useQueryClient } from '@tanstack/react-query';

import {
	useDeleteInstrumentNote,
	useUpsertInstrumentNote,
} from '@/entities/instrument';
import {
	useDeleteStrategyNote,
	useUpsertStrategyNote,
} from '@/entities/strategy';
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

	const upsertInstrumentNoteMutation = useUpsertInstrumentNote();
	const upsertStrategyNoteMutation = useUpsertStrategyNote();
	const deleteInstrumentNoteMutation = useDeleteInstrumentNote();
	const deleteStrategyNoteMutation = useDeleteStrategyNote();

	function isNoteSaving(note: DraftedPersonalNote) {
		const sourceId = getApiSourceId(note.source.id);
		if (sourceId === null) {
			return false;
		}

		if (note.source.type === 'stock') {
			return upsertInstrumentNoteMutation.isPending && upsertInstrumentNoteMutation.variables?.instrumentId === sourceId;
		}

		return upsertStrategyNoteMutation.isPending && upsertStrategyNoteMutation.variables?.strategyId === sourceId;
	}

	function isNoteDeleting(note: DraftedPersonalNote) {
		const sourceId = getApiSourceId(note.source.id);
		if (sourceId === null) {
			return false;
		}

		if (note.source.type === 'stock') {
			return deleteInstrumentNoteMutation.isPending && deleteInstrumentNoteMutation.variables?.instrumentId === sourceId;
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

		const data = { text };
		const mutationOptions = {
			onSuccess: () => {
				setApiNoteTextInCache({ queryClient, note, text });
				onSuccess();
			},
		};

		if (note.source.type === 'stock') {
			upsertInstrumentNoteMutation.mutate(
				{ instrumentId: sourceId, data },
				mutationOptions,
			);
			return;
		}

		upsertStrategyNoteMutation.mutate(
			{ strategyId: sourceId, data },
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
				{ instrumentId: sourceId },
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
