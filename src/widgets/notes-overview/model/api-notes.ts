import { generatePath } from 'react-router';

import type {
	NoteSource,
	StoredPersonalNote,
} from '@/entities/note';
import type { StockLinkedStrategy } from '@/entities/stock';
import type { Note } from '@/shared/api';

import { getNoteId } from '@/entities/note';
import {
	getStockByInstrumentId,
	mockStocks,
} from '@/entities/stock';
import { ROUTES } from '@/shared/model/routes';

type GetApiNotesOptions = {
	instrumentNotes: Note[];
	strategyNotes: Note[];
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
	note: Note,
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
	note: Note,
	sourceType: NoteSource['type'],
): NoteSource | null {
	if (sourceType === 'stock') {
		return getStockNoteSource(note.tradeCodeId);
	}

	return getStrategyNoteSource(note.tradeStrategyId);
}

function getStockNoteSource(instrumentId: number | undefined): NoteSource | null {
	if (!instrumentId) {
		return null;
	}

	const stock = getStockByInstrumentId(instrumentId);

	return {
		type: 'stock',
		id: String(instrumentId),
		label: stock?.ticker ?? `Инструмент #${instrumentId}`,
		description: stock?.name,
		path: stock
			? generatePath(ROUTES.STOCK, { stockId: stock.id })
			: ROUTES.STOCKS,
	};
}

function getStrategyNoteSource(strategyId: number | undefined): NoteSource | null {
	if (!strategyId) {
		return null;
	}

	const strategy = getLinkedStrategyById(strategyId);

	return {
		type: 'strategy',
		id: String(strategyId),
		label: strategy?.name ?? `Стратегия #${strategyId}`,
		description: strategy?.description ?? 'Торговая стратегия',
		path: generatePath(ROUTES.STRATEGY, {
			strategyName: strategy?.name ?? String(strategyId),
		}),
	};
}

function getLinkedStrategyById(
	strategyId: number,
): StockLinkedStrategy | undefined {
	return mockStocks
		.flatMap((stock) => stock.linkedStrategies)
		.find((strategy) => strategy.id === strategyId);
}
