import type { Signal, TradeHistory } from './signal';

export const mockSignals: Signal[] = [
	{
		id: '1',
		asset: 'AAPL',
		tradeCode: 'AAPL',
		date: '2024-01-15',
		dateTime: '2024-01-15T00:00:00Z',
		time: null,
		close: 185.91232,
		direction: 'buy',
		confidence: 87,
		strategy: 'RSI Divergence',
	},
	{
		id: '2',
		asset: 'TSLA',
		tradeCode: 'TSLA',
		date: '2024-01-15',
		dateTime: '2024-01-15T00:00:00Z',
		time: null,
		close: 219.45,
		direction: 'sell',
		confidence: 72,
		strategy: 'MACD Crossover',
	},
	{
		id: '3',
		asset: 'EUR/USD',
		date: '2024-01-15',
		dateTime: '2024-01-15T10:45:00Z',
		time: '10:45',
		tradeCode: 'EUR/USD',
		close: 1.0892,
		direction: 'buy',
		confidence: 90,
		strategy: 'Bollinger Breakout',
	},
	{
		id: '4',
		asset: 'Gold',
		date: '2024-01-15',
		dateTime: '2024-01-15T09:30:00Z',
		time: '09:30',
		tradeCode: 'Gold',
		close: 2034.50,
		direction: 'buy',
		confidence: 78,
		strategy: 'Moving Average',
	},
	{
		id: '5',
		asset: 'MSFT',
		tradeCode: 'MSFT',
		date: '2024-01-14',
		dateTime: '2024-01-14T00:00:00Z',
		time: null,
		close: 388.47,
		direction: 'buy',
		confidence: 82,
		strategy: 'Stochastic Oscillator',
	},
	{
		id: '6',
		asset: 'Crude Oil',
		date: '2024-01-14',
		dateTime: '2024-01-14T14:20:00Z',
		time: '14:20',
		tradeCode: 'Crude Oil',
		close: 72.68,
		direction: 'sell',
		confidence: 75,
		strategy: 'Support/Resistance',
	},
	{
		id: '7',
		asset: 'GOOGL',
		tradeCode: 'GOOGL',
		date: '2024-01-14',
		dateTime: '2024-01-14T00:00:00Z',
		time: null,
		close: 142.38,
		direction: 'sell',
		confidence: 68,
		strategy: 'Fibonacci Retracement',
	},
	{
		id: '8',
		asset: 'S&P 500',
		date: '2024-01-13',
		dateTime: '2024-01-13T16:00:00Z',
		time: '16:00',
		tradeCode: 'S&P 500',
		close: 4783.45,
		direction: 'buy',
		confidence: 85,
		strategy: 'Trend Following',
	},
];

export function generateMockHistory(asset: string): TradeHistory[] {
	const basePrice = mockSignals.find((s) => s.asset === asset)?.close || 100;
	const history: TradeHistory[] = [];

	for (let i = 50; i >= 0; i--) {
		const date = new Date(2024, 0, 15 - i);
		const volatility = basePrice * 0.02;
		const open = basePrice + (Math.random() - 0.5) * volatility;
		const close = open + (Math.random() - 0.5) * volatility;

		history.push({
			id: `${asset}-${i}`,
			date: date.toISOString().split('T')[0],
			dateTime: date.toISOString(),
			close: Number(close.toFixed(2)),
			signal: Math.random() > 0.6 ? 'buy' : Math.random() > 0.4 ? 'sell' : 'hold',
		});
	}

	return history;
}
