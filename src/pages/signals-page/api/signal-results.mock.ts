import {
	getGetResultByStrategyAndTradeCodeResponseMock,
	getGetResultResponseMock,
	type getResultByStrategyAndTradeCodeResponseSuccess,
	type getResultResponseSuccess,
} from '@/entities/signal';

const MOCK_SIGNAL_STRATEGIES = [
	{
		name: 'RSI Divergence',
		tickers: [
			{
				tradeCode: 'AAPL',
				accuracy: 87,
				results: [
					{ date: '2026-05-08T14:30:00Z', closePrice: 185.91, signal: 'buy' },
					{ date: '2026-05-07T14:30:00Z', closePrice: 182.44, signal: 'hold' },
					{ date: '2026-05-06T14:30:00Z', closePrice: 180.12, signal: 'sell' },
				],
			},
			{
				tradeCode: 'MSFT',
				accuracy: 82,
				results: [
					{ date: '2026-05-08T14:30:00Z', closePrice: 388.47, signal: 'buy' },
					{ date: '2026-05-07T14:30:00Z', closePrice: 382.16, signal: 'hold' },
					{ date: '2026-05-06T14:30:00Z', closePrice: 379.64, signal: 'hold' },
				],
			},
		],
	},
	{
		name: 'MACD Crossover',
		tickers: [
			{
				tradeCode: 'TSLA',
				accuracy: 72,
				results: [
					{ date: '2026-05-08T14:30:00Z', closePrice: 219.45, signal: 'sell' },
					{ date: '2026-05-07T14:30:00Z', closePrice: 224.8, signal: 'hold' },
					{ date: '2026-05-06T14:30:00Z', closePrice: 227.13, signal: 'buy' },
				],
			},
			{
				tradeCode: 'GOOGL',
				accuracy: 68,
				results: [
					{ date: '2026-05-08T14:30:00Z', closePrice: 142.38, signal: 'sell' },
					{ date: '2026-05-07T14:30:00Z', closePrice: 144.05, signal: 'hold' },
					{ date: '2026-05-06T14:30:00Z', closePrice: 141.88, signal: 'buy' },
				],
			},
		],
	},
	{
		name: 'Trend Following',
		tickers: [
			{
				tradeCode: 'SPY',
				accuracy: 85,
				results: [
					{ date: '2026-05-08T14:30:00Z', closePrice: 478.35, signal: 'buy' },
					{ date: '2026-05-07T14:30:00Z', closePrice: 474.1, signal: 'buy' },
					{ date: '2026-05-06T14:30:00Z', closePrice: 470.22, signal: 'hold' },
				],
			},
		],
	},
];

export function getSignalResultsMock(): Promise<getResultResponseSuccess> {
	return Promise.resolve(createMockResponse(
		getGetResultResponseMock({
			strategies: MOCK_SIGNAL_STRATEGIES,
		}),
	));
}

export function getSignalHistoryMock(
	strategyName: string,
	tradeCode: string,
): Promise<getResultByStrategyAndTradeCodeResponseSuccess> {
	const strategy = MOCK_SIGNAL_STRATEGIES.find(
		(mockStrategy) => mockStrategy.name === strategyName,
	);
	const ticker = strategy?.tickers.find(
		(mockTicker) => mockTicker.tradeCode === tradeCode,
	);

	return Promise.resolve(createMockResponse(
		getGetResultByStrategyAndTradeCodeResponseMock({
			strategies: strategy && ticker
				? [{ ...strategy, tickers: [ticker] }]
				: [],
		}),
	));
}

function createMockResponse<TData>(data: TData) {
	return {
		data,
		headers: new Headers(),
		status: 200 as const,
	};
}
