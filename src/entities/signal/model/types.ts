export type Signal = {
	id: string;
	asset: string;
	type: 'stock' | 'futures';
	date: string;
	time?: string;
	close: number;
	direction: 'buy' | 'sell';
	confidence: number;
	strategy: string;
};

export type TradeHistory = {
	id: string;
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	signal: 'buy' | 'sell' | 'hold';
	profit?: number;
};
