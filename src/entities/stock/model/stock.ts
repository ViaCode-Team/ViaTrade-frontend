export type Stock = {
	id: string;
	ticker: string;
	name: string;
	exchange: string;
	sector: string;
	price: number;
	dayChangePercent: number;
};

export const mockStocks: Stock[] = [
	{
		id: 'aapl',
		ticker: 'AAPL',
		name: 'Apple Inc.',
		exchange: 'NASDAQ',
		sector: 'Технологии',
		price: 185.91,
		dayChangePercent: 1.24,
	},
	{
		id: 'tsla',
		ticker: 'TSLA',
		name: 'Tesla, Inc.',
		exchange: 'NASDAQ',
		sector: 'Автомобили',
		price: 219.45,
		dayChangePercent: -0.86,
	},
	{
		id: 'msft',
		ticker: 'MSFT',
		name: 'Microsoft Corporation',
		exchange: 'NASDAQ',
		sector: 'ПО и облака',
		price: 388.47,
		dayChangePercent: 0.52,
	},
	{
		id: 'googl',
		ticker: 'GOOGL',
		name: 'Alphabet Inc.',
		exchange: 'NASDAQ',
		sector: 'Интернет',
		price: 142.38,
		dayChangePercent: -1.18,
	},
	{
		id: 'nvda',
		ticker: 'NVDA',
		name: 'NVIDIA Corporation',
		exchange: 'NASDAQ',
		sector: 'Полупроводники',
		price: 875.28,
		dayChangePercent: 2.31,
	},
	{
		id: 'jpm',
		ticker: 'JPM',
		name: 'JPMorgan Chase & Co.',
		exchange: 'NYSE',
		sector: 'Финансы',
		price: 198.64,
		dayChangePercent: 0.18,
	},
];
