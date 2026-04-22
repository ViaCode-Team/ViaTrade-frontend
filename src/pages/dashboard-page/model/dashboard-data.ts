export type DashboardSignal = {
	id: string;
	strategy: string;
	asset: string;
	direction: 'buy' | 'sell' | 'hold';
	strength: number;
	timestamp: string;
};

export type TradeStats = {
	totalTrades: number;
	profitableTrades: number;
	losingTrades: number;
	totalProfit: number;
	averageProfit: number;
	winRate: number;
	profitFactor: number;
	averageHoldTime: string;
};

export const mockSignals: DashboardSignal[] = [
	{
		id: '1',
		strategy: 'RSI Divergence',
		asset: 'EUR/USD',
		direction: 'buy',
		strength: 85,
		timestamp: '10:45',
	},
	{
		id: '2',
		strategy: 'MACD Crossover',
		asset: 'GBP/JPY',
		direction: 'sell',
		strength: 72,
		timestamp: '10:30',
	},
	{
		id: '3',
		strategy: 'Bollinger Breakout',
		asset: 'BTC/USD',
		direction: 'buy',
		strength: 90,
		timestamp: '10:15',
	},
	{
		id: '4',
		strategy: 'Moving Average',
		asset: 'Gold',
		direction: 'hold',
		strength: 45,
		timestamp: '09:55',
	},
	{
		id: '5',
		strategy: 'Stochastic Oscillator',
		asset: 'ETH/USD',
		direction: 'buy',
		strength: 78,
		timestamp: '09:40',
	},
];

export const mockStats: TradeStats = {
	totalTrades: 248,
	profitableTrades: 156,
	losingTrades: 92,
	totalProfit: 12450.75,
	averageProfit: 50.20,
	winRate: 62.9,
	profitFactor: 1.85,
	averageHoldTime: '4h 32m',
};
