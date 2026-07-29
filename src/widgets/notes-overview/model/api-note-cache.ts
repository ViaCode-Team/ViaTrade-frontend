import type { QueryClient } from '@tanstack/react-query';

import type { getNotesResponseSuccess } from '@/entities/note';
import type { DraftedPersonalNote } from '@/features/note/manage-note';

import { getGetNotesQueryKey } from '@/entities/note';

export function setApiNoteTextInCache({
	queryClient,
	note,
	text,
}: {
	queryClient: QueryClient;
	note: DraftedPersonalNote;
	text: string;
}) {
	if (note.source.type === 'stock') {
		const sourceId = Number(note.source.id);

		queryClient.setQueriesData<getNotesResponseSuccess>(
			{ queryKey: getGetNotesQueryKey() },
			(data) => updateInstrumentNotesData(data, sourceId, text),
		);
		return;
	}

	const sourceId = Number(note.source.id);

	queryClient.setQueriesData<getNotesResponseSuccess>(
		{ queryKey: getGetNotesQueryKey() },
		(data) => updateStrategyNotesData(data, sourceId, text),
	);
}

export function deleteApiNoteFromCache({
	queryClient,
	note,
}: {
	queryClient: QueryClient;
	note: DraftedPersonalNote;
}) {
	if (note.source.type === 'stock') {
		const sourceId = Number(note.source.id);

		queryClient.setQueriesData<getNotesResponseSuccess>(
			{ queryKey: getGetNotesQueryKey() },
			(data) => deleteInstrumentNoteData(data, sourceId),
		);
		return;
	}

	const sourceId = Number(note.source.id);

	queryClient.setQueriesData<getNotesResponseSuccess>(
		{ queryKey: getGetNotesQueryKey() },
		(data) => deleteStrategyNoteData(data, sourceId),
	);
}

function updateInstrumentNotesData(
	data: getNotesResponseSuccess | undefined,
	sourceId: number,
	text: string,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: {
			...data.data,
			items: data.data.items.map((note) => note.instrument?.id === sourceId
				? { ...note, text }
				: note),
		},
	};
}

function deleteInstrumentNoteData(
	data: getNotesResponseSuccess | undefined,
	sourceId: number,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: {
			...data.data,
			items: data.data.items.filter((note) => note.instrument?.id !== sourceId),
		},
	};
}

function deleteStrategyNoteData(
	data: getNotesResponseSuccess | undefined,
	sourceId: number,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: {
			...data.data,
			items: data.data.items.filter((note) => note.strategy?.id !== sourceId),
		},
	};
}

function updateStrategyNotesData(
	data: getNotesResponseSuccess | undefined,
	sourceId: number,
	text: string,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: {
			...data.data,
			items: data.data.items.map((note) => note.strategy?.id === sourceId
				? { ...note, text }
				: note),
		},
	};
}
