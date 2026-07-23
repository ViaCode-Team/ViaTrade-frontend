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

		queryClient.setQueryData<getUserNotesResponseSuccess>(
			getGetUserNotesQueryKey(),
			(data) => updateInstrumentNotesData(data, sourceId, text),
		);
		return;
	}

	const sourceId = Number(note.source.id);

	queryClient.setQueryData<getUserNotesResponseSuccess>(
		getGetUserNotesQueryKey(),
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

		queryClient.setQueryData<getUserNotesResponseSuccess>(
			getGetUserNotesQueryKey(),
			(data) => deleteInstrumentNoteData(data, sourceId),
		);
		return;
	}

	const sourceId = Number(note.source.id);

	queryClient.setQueryData<getUserNotesResponseSuccess>(
		getGetUserNotesQueryKey(),
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

	const exists = data.data.items.some((note) => note.tradeCodeId === sourceId);

	if (!exists) {
		return {
			...data,
			data: {
				...data.data,
				items: [
					...data.data.items,
					{
						id: Date.now(),
						tradeCodeId: sourceId,
						noteText: text,
						isFavourite: false,
						updateTime: new Date().toISOString(),
					} as any,
				],
			},
		};
	}

	return {
		...data,
		data: {
			...data.data,
			items: data.data.items.map((note) => note.tradeCodeId === sourceId
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
			items: data.data.items.filter((note) => note.tradeCodeId !== sourceId),
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
			items: data.data.items.filter((note) => note.tradeStrategyId !== sourceId),
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

	const exists = data.data.items.some((note) => note.tradeStrategyId === sourceId);

	if (!exists) {
		return {
			...data,
			data: {
				...data.data,
				items: [
					...data.data.items,
					{
						id: Date.now(),
						tradeStrategyId: sourceId,
						noteText: text,
						isFavourite: false,
						updateTime: new Date().toISOString(),
					} as any,
				],
			},
		};
	}

	return {
		...data,
		data: {
			...data.data,
			items: data.data.items.map((note) => note.tradeStrategyId === sourceId
				? { ...note, noteText: text }
				: note),
		},
	};
}
