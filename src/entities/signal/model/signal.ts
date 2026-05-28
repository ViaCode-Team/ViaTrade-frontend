import type {
	StrategyResult,
	StrategyResultResponse,
} from '@/shared/api';

export type SignalDirection = 'buy' | 'sell' | 'hold';

export type Signal = {
	id: string;
	asset: string;
	tradeCode: string;
	date: string;
	dateTime: string;
	time: string | null;
	close: number;
	direction: SignalDirection;
	confidence: number | null;
	strategy: string;
};

export type TradeHistory = {
	id: string;
	date: string;
	dateTime: string;
	close: number;
	signal: SignalDirection;
};

const BUY_SIGNAL_VALUES = new Set([
	'buy',
	'long',
	'покупать',
	'купить',
]);

const SELL_SIGNAL_VALUES = new Set([
	'sell',
	'short',
	'продавать',
	'продать',
]);

const HOLD_SIGNAL_VALUES = new Set([
	'hold',
	'neutral',
	'none',
	'держать',
	'нет сигнала',
]);

export function mapStrategyResultResponseToSignals(
	response: StrategyResultResponse,
) {
	return response.strategies.flatMap((strategy) =>
		strategy.tickers.flatMap((ticker) => {
			const latestResult = getLatestSupportedResult(ticker.results);

			if (!latestResult) {
				return [];
			}

			const direction = normalizeSignalDirection(latestResult.signal);

			if (!direction) {
				return [];
			}

			const dateParts = getDateParts(latestResult.date);

			return {
				id: `${strategy.name}:${ticker.tradeCode}:${latestResult.date}`,
				asset: ticker.tradeCode,
				tradeCode: ticker.tradeCode,
				date: dateParts.date,
				dateTime: latestResult.date,
				time: dateParts.time,
				close: latestResult.closePrice,
				direction,
				confidence: normalizeConfidence(ticker.accuracy),
				strategy: strategy.name,
			};
		}),
	);
}

export function mapStrategyResultResponseToTradeHistory(
	response: StrategyResultResponse,
	strategyName: string,
	tradeCode: string,
) {
	const strategyResults = response.strategies.find(
		(strategy) => strategy.name === strategyName,
	);
	const tickerResults = strategyResults?.tickers.find(
		(ticker) => ticker.tradeCode === tradeCode,
	);
	const results = tickerResults?.results ?? response.strategies.flatMap(
		(strategy) => strategy.tickers.flatMap((ticker) => ticker.results),
	);

	return results.reduce<TradeHistory[]>((history, result) => {
		const signal = normalizeSignalDirection(result.signal);

		if (!signal) {
			return history;
		}

		const dateParts = getDateParts(result.date);

		history.push({
			id: `${strategyName}:${tradeCode}:${result.date}`,
			date: dateParts.date,
			dateTime: result.date,
			close: result.closePrice,
			signal,
		});

		return history;
	}, []).sort(
		(a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
	);
}

function getLatestSupportedResult(results: StrategyResult[]) {
	return [...results]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.find((result) => normalizeSignalDirection(result.signal) !== null);
}

function normalizeSignalDirection(signal: string): SignalDirection | null {
	const normalizedSignal = signal.trim().toLowerCase();

	if (BUY_SIGNAL_VALUES.has(normalizedSignal)) {
		return 'buy';
	}

	if (SELL_SIGNAL_VALUES.has(normalizedSignal)) {
		return 'sell';
	}

	if (HOLD_SIGNAL_VALUES.has(normalizedSignal)) {
		return 'hold';
	}

	return null;
}

function normalizeConfidence(accuracy: number | null | undefined) {
	if (typeof accuracy !== 'number' || Number.isNaN(accuracy)) {
		return null;
	}

	return Math.min(100, Math.max(0, Math.round(accuracy)));
}

function getDateParts(dateTime: string) {
	const date = new Date(dateTime);

	if (Number.isNaN(date.getTime())) {
		return {
			date: dateTime,
			time: null,
		};
	}

	return {
		date: date.toLocaleDateString('ru-RU'),
		time: date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		}),
	};
}
