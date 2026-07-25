import type { QueryClient } from '@tanstack/react-query';

import type { getUserNotesResponseSuccess } from '@/entities/note';
import type { DraftedPersonalNote } from '@/features/note/manage-note';

import { getGetUserNotesQueryKey } from '@/entities/note';

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

		queryClient.setQueriesData<getUserNotesResponseSuccess>(
			{ queryKey: getGetUserNotesQueryKey() },
			(data) => updateInstrumentNotesData(data, sourceId, text),
		);
		return;
	}

	const sourceId = Number(note.source.id);

	queryClient.setQueriesData<getUserNotesResponseSuccess>(
		{ queryKey: getGetUserNotesQueryKey() },
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

		queryClient.setQueriesData<getUserNotesResponseSuccess>(
			{ queryKey: getGetUserNotesQueryKey() },
			(data) => deleteInstrumentNoteData(data, sourceId),
		);
		return;
	}

	const sourceId = Number(note.source.id);

	queryClient.setQueriesData<getUserNotesResponseSuccess>(
		{ queryKey: getGetUserNotesQueryKey() },
		(data) => deleteStrategyNoteData(data, sourceId),
	);
}

function updateInstrumentNotesData(
	data: getUserNotesResponseSuccess | undefined,
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
			items: data.data.items.map((note) => note.tradeCode?.id === sourceId
				? { ...note, noteText: text }
				: note),
		},
	};
}

function deleteInstrumentNoteData(
	data: getUserNotesResponseSuccess | undefined,
	sourceId: number,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: {
			...data.data,
			items: data.data.items.filter((note) => note.tradeCode?.id !== sourceId),
		},
	};
}

function deleteStrategyNoteData(
	data: getUserNotesResponseSuccess | undefined,
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
	data: getUserNotesResponseSuccess | undefined,
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
				? { ...note, noteText: text }
				: note),
		},
	};
}
