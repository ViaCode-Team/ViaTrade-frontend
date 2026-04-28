import type { Signal, TradeHistory } from './types';

export const mockSignals: Signal[] = [
	{
		id: '1',
		asset: 'AAPL',
		type: 'stock',
		date: '2024-01-15',
		close: 185.91232,
		direction: 'buy',
		confidence: 87,
		strategy: 'RSI Divergence',
	},
	{
		id: '2',
		asset: 'TSLA',
		type: 'stock',
		date: '2024-01-15',
		close: 219.45,
		direction: 'sell',
		confidence: 72,
		strategy: 'MACD Crossover',
	},
	{
		id: '3',
		asset: 'EUR/USD',
		type: 'futures',
		date: '2024-01-15',
		time: '10:45',
		close: 1.0892,
		direction: 'buy',
		confidence: 90,
		strategy: 'Bollinger Breakout',
	},
	{
		id: '4',
		asset: 'Gold',
		type: 'futures',
		date: '2024-01-15',
		time: '09:30',
		close: 2034.50,
		direction: 'buy',
		confidence: 78,
		strategy: 'Moving Average',
	},
	{
		id: '5',
		asset: 'MSFT',
		type: 'stock',
		date: '2024-01-14',
		close: 388.47,
		direction: 'buy',
		confidence: 82,
		strategy: 'Stochastic Oscillator',
	},
	{
		id: '6',
		asset: 'Crude Oil',
		type: 'futures',
		date: '2024-01-14',
		time: '14:20',
		close: 72.68,
		direction: 'sell',
		confidence: 75,
		strategy: 'Support/Resistance',
	},
	{
		id: '7',
		asset: 'GOOGL',
		type: 'stock',
		date: '2024-01-14',
		close: 142.38,
		direction: 'sell',
		confidence: 68,
		strategy: 'Fibonacci Retracement',
	},
	{
		id: '8',
		asset: 'S&P 500',
		type: 'futures',
		date: '2024-01-13',
		time: '16:00',
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
		const high = Math.max(open, close) + Math.random() * volatility * 0.5;
		const low = Math.min(open, close) - Math.random() * volatility * 0.5;

		history.push({
			id: `${asset}-${i}`,
			date: date.toISOString().split('T')[0],
			open: Number(open.toFixed(2)),
			high: Number(high.toFixed(2)),
			low: Number(low.toFixed(2)),
			close: Number(close.toFixed(2)),
			volume: Math.floor(Math.random() * 1000000) + 100000,
			signal: Math.random() > 0.6 ? 'buy' : Math.random() > 0.4 ? 'sell' : 'hold',
			profit: Math.random() > 0.5 ? Number((Math.random() * 500).toFixed(2)) : -Number((Math.random() * 300).toFixed(2)),
		});
	}

	return history;
}
