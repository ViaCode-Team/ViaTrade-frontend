import type { QueryClient } from '@tanstack/react-query';

import type {
	getByUserInstrumentAllResponseSuccess,
	getByUserStrategyAllResponseSuccess,
} from '@/entities/note';

import {
	getGetByUserInstrumentAllQueryKey,
	getGetByUserStrategyAllQueryKey,
} from '@/entities/note';

import type { DraftedPersonalNote } from './note-drafts';

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

		queryClient.setQueryData<getByUserInstrumentAllResponseSuccess>(
			getGetByUserInstrumentAllQueryKey(),
			(data) => updateInstrumentNotesData(data, sourceId, text),
		);
		return;
	}

	const sourceId = Number(note.source.id);

	queryClient.setQueryData<getByUserStrategyAllResponseSuccess>(
		getGetByUserStrategyAllQueryKey(),
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

		queryClient.setQueryData<getByUserInstrumentAllResponseSuccess>(
			getGetByUserInstrumentAllQueryKey(),
			(data) => deleteInstrumentNoteData(data, sourceId),
		);
		return;
	}

	const sourceId = Number(note.source.id);

	queryClient.setQueryData<getByUserStrategyAllResponseSuccess>(
		getGetByUserStrategyAllQueryKey(),
		(data) => deleteStrategyNoteData(data, sourceId),
	);
}

function updateInstrumentNotesData(
	data: getByUserInstrumentAllResponseSuccess | undefined,
	sourceId: number,
	text: string,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: data.data.map((note) => note.tradeCodeId === sourceId
			? { ...note, noteText: text }
			: note),
	};
}

function deleteInstrumentNoteData(
	data: getByUserInstrumentAllResponseSuccess | undefined,
	sourceId: number,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: data.data.filter((note) => note.tradeCodeId !== sourceId),
	};
}

function deleteStrategyNoteData(
	data: getByUserStrategyAllResponseSuccess | undefined,
	sourceId: number,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: data.data.filter((note) => note.tradeStrategyId !== sourceId),
	};
}

function updateStrategyNotesData(
	data: getByUserStrategyAllResponseSuccess | undefined,
	sourceId: number,
	text: string,
) {
	if (!data) {
		return data;
	}

	return {
		...data,
		data: data.data.map((note) => note.tradeStrategyId === sourceId
			? { ...note, noteText: text }
			: note),
	};
}
