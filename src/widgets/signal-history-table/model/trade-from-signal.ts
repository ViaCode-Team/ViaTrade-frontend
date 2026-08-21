import { type CreateTradeRequest, TradeSignal } from '@/shared/api';

const DEFAULT_TRADE_TYPE_ID = 1;

export type TradeFromSignalDraft = {
	instrumentId: number;
	ticker: string;
	occurredAt: string;
	close: number;
	direction: 'buy' | 'sell' | 'hold';
};

export function createTradeRequestFromSignal(
	draft: TradeFromSignalDraft,
	quantity: number,
): CreateTradeRequest | null {
	const signal = getTradeSignal(draft.direction);

	if (
		signal === null
		|| !isPositiveInteger(draft.instrumentId)
		|| !isPositiveNumber(draft.close)
		|| !isValidOccurredAt(draft.occurredAt)
		|| !isPositiveInteger(quantity)
	) {
		return null;
	}

	return {
		tradeTypeId: DEFAULT_TRADE_TYPE_ID,
		instrumentId: draft.instrumentId,
		signal,
		quantity,
		openPrice: draft.close,
		openedAt: draft.occurredAt,
	};
}

export function isTradeFromSignalAvailable(draft: TradeFromSignalDraft): boolean {
	return getTradeSignal(draft.direction) !== null
		&& isPositiveInteger(draft.instrumentId)
		&& isPositiveNumber(draft.close)
		&& isValidOccurredAt(draft.occurredAt);
}

function getTradeSignal(direction: TradeFromSignalDraft['direction']): TradeSignal | null {
	if (direction === 'buy') {
		return TradeSignal.NUMBER_1;
	}

	if (direction === 'sell') {
		return TradeSignal.NUMBER_MINUS_1;
	}

	return null;
}

function isPositiveInteger(value: number): boolean {
	return Number.isInteger(value) && value >= 1;
}

function isPositiveNumber(value: number): boolean {
	return Number.isFinite(value) && value > 0;
}

function isValidOccurredAt(value: string): boolean {
	return value.trim().length > 0 && !Number.isNaN(Date.parse(value));
}
