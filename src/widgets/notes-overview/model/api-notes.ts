import { generatePath } from 'react-router';

import type {
	NoteSource,
	StoredPersonalNote,
} from '@/entities/note';
import type { Stock } from '@/entities/trade-code/stock';
import type { Note } from '@/shared/api';
import type { TradeStrategy } from '@/shared/api/types/gen';

import { getNoteId } from '@/entities/note';
import { ROUTES } from '@/shared/model/routes';

type GetApiNotesOptions = {
	instrumentNotes: Note[];
	strategyNotes: Note[];
	stocks: Stock[];
	strategies: TradeStrategy[];
};

export function getApiPersonalNotes({
	instrumentNotes,
	strategyNotes,
	stocks,
	strategies,
}: GetApiNotesOptions): StoredPersonalNote[] {
	return [
		...instrumentNotes.map((note) => mapApiNoteToStoredNote(note, 'stock', stocks, strategies)),
		...strategyNotes.map((note) => mapApiNoteToStoredNote(note, 'strategy', stocks, strategies)),
	].filter((note): note is StoredPersonalNote => note !== null);
}

function mapApiNoteToStoredNote(
	note: Note,
	sourceType: NoteSource['type'],
	stocks: Stock[],
	strategies: TradeStrategy[],
): StoredPersonalNote | null {
	const source = getApiNoteSource(note, sourceType, stocks, strategies);

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
	stocks: Stock[],
	strategies: TradeStrategy[],
): NoteSource | null {
	if (sourceType === 'stock') {
		return getStockNoteSource(note.tradeCodeId, stocks);
	}

	return getStrategyNoteSource(note.tradeStrategyId, strategies);
}

function getStockNoteSource(instrumentId: number | undefined, stocks: Stock[]): NoteSource | null {
	if (!instrumentId) {
		return null;
	}

	const stock = stocks.find((s) => s.instrumentId === instrumentId);

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

function getStrategyNoteSource(strategyId: number | undefined, strategies: TradeStrategy[]): NoteSource | null {
	if (!strategyId) {
		return null;
	}

	const strategy = strategies.find((s) => s.id === strategyId);

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
