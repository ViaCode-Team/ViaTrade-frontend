import { generatePath } from 'react-router';

import type {
	NoteSource,
	StoredPersonalNote,
} from '@/entities/note';
import type { NoteResponse } from '@/shared/api';

import { getNoteId } from '@/entities/note';
import { ROUTES } from '@/shared/model';

type GetApiNotesOptions = {
	instrumentNotes: NoteResponse[];
	strategyNotes: NoteResponse[];
};

export function getApiPersonalNotes({
	instrumentNotes,
	strategyNotes,
}: GetApiNotesOptions): StoredPersonalNote[] {
	return [
		...instrumentNotes.map((note) => mapApiNoteToStoredNote(note, 'stock')),
		...strategyNotes.map((note) => mapApiNoteToStoredNote(note, 'strategy')),
	].filter((note): note is StoredPersonalNote => note !== null);
}

function mapApiNoteToStoredNote(
	note: NoteResponse,
	sourceType: NoteSource['type'],
): StoredPersonalNote | null {
	const source = getApiNoteSource(note, sourceType);

	if (!source) {
		return null;
	}

	return {
		id: getNoteId(source),
		source,
		text: note.noteText,
	};
}

function getApiNoteSource(
	note: NoteResponse,
	sourceType: NoteSource['type'],
): NoteSource | null {
	if (sourceType === 'stock') {
		return getStockNoteSource(note.tradeCode);
	}

	return getStrategyNoteSource(note.strategy);
}

function getStockNoteSource(tradeCode: NoteResponse['tradeCode']): NoteSource | null {
	if (!tradeCode) {
		return null;
	}

	return {
		type: 'stock',
		id: String(tradeCode.id),
		label: tradeCode.ticker,
		description: tradeCode.name,
		path: generatePath(ROUTES.STOCK, { stockId: tradeCode.ticker.toLowerCase() }),
	};
}

function getStrategyNoteSource(strategy: NoteResponse['strategy']): NoteSource | null {
	if (!strategy) {
		return null;
	}

	return {
		type: 'strategy',
		id: String(strategy.id),
		label: strategy.name,
		description: strategy.description ?? 'Торговая стратегия',
		path: generatePath(ROUTES.STRATEGY, {
			strategyName: strategy.name,
		}),
	};
}
