import type { SignalResponsePageResult } from '@/shared/api';

export type SignalDirection = 'buy' | 'sell' | 'hold';

export type Signal = {
	id: string;
	asset: string;
	instrumentId: number;
	strategyId: number;
	date: string;
	occurredAt: string;
	time?: string;
	close: number;
	direction: SignalDirection;
	confidence?: number;
	strategy: string;
};

export type TradeHistory = {
	id: string;
	date: string;
	occurredAt: string;
	close: number;
	signal: SignalDirection;
};

const BUY_SIGNAL_VALUES = new Set(['buy', 'long', 'покупать', 'купить']);
const SELL_SIGNAL_VALUES = new Set(['sell', 'short', 'продавать', 'продать']);
const HOLD_SIGNAL_VALUES = new Set(['hold', 'neutral', 'none', 'держать', 'нет сигнала']);

export function mapSignalResponsePageToSignals(response: SignalResponsePageResult): Signal[] {
	return response.items.flatMap((signal) => {
		const direction = normalizeSignalDirection(signal.signal);
		if (!direction) {
			return [];
		}

		const dateParts = getDateParts(signal.date);
		return [{
			id: `${signal.strategyId}:${signal.instrumentId}:${signal.date}`,
			asset: signal.symbol,
			instrumentId: signal.instrumentId,
			strategyId: signal.strategyId,
			date: dateParts.date,
			occurredAt: signal.date,
			time: dateParts.time,
			close: signal.closePrice,
			direction,
			confidence: normalizeConfidence(signal.accuracy),
			strategy: signal.strategyName,
		}];
	});
}

export function mapSignalResponsePageToTradeHistory(response: SignalResponsePageResult): TradeHistory[] {
	return mapSignalResponsePageToSignals(response)
		.map(({
			id,
			date,
			occurredAt,
			close,
			direction,
		}) => ({
			id,
			date,
			occurredAt,
			close,
			signal: direction,
		}))
		.sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());
}

function normalizeSignalDirection(signal: string): SignalDirection | undefined {
	const normalizedSignal = signal.trim().toLowerCase();
	if (BUY_SIGNAL_VALUES.has(normalizedSignal))
		return 'buy';
	if (SELL_SIGNAL_VALUES.has(normalizedSignal))
		return 'sell';
	if (HOLD_SIGNAL_VALUES.has(normalizedSignal))
		return 'hold';
	return undefined;
}

function normalizeConfidence(accuracy: number | null | undefined) {
	if (typeof accuracy !== 'number' || Number.isNaN(accuracy))
		return undefined;
	return Math.min(100, Math.max(0, Math.round(accuracy)));
}

function getDateParts(occurredAt: string) {
	const date = new Date(occurredAt);
	if (Number.isNaN(date.getTime()))
		return { date: occurredAt, time: undefined };
	return {
		date: date.toLocaleDateString('ru-RU'),
		time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
	};
}
