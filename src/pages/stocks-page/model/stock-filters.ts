import type { Stock } from '@/entities/stock';

export type StockSortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'change-desc' | 'change-asc';
export type StockTrendFilter = 'all' | 'gainers' | 'losers';

export const stockSortOptions = [
	{ value: 'name-asc', label: 'По названию (от А до Я)' },
	{ value: 'name-desc', label: 'По названию (от Я до А)' },
	{ value: 'price-desc', label: 'По цене (убывание)' },
	{ value: 'price-asc', label: 'По цене (возрастание)' },
	{ value: 'change-desc', label: 'Лидеры роста' },
	{ value: 'change-asc', label: 'Лидеры падения' },
];

export function getFilteredStocks({
	stocks,
	searchQuery,
	trendFilter = 'all',
	sortOption = 'name-asc',
}: {
	stocks: Stock[];
	searchQuery: string;
	trendFilter?: StockTrendFilter;
	sortOption?: StockSortOption;
}) {
	const normalizedSearchQuery = searchQuery.trim().toLowerCase();

	const filtered = stocks.filter((stock) => {
		const matchesSearch = normalizedSearchQuery.length === 0
			|| stock.ticker.toLowerCase().includes(normalizedSearchQuery)
			|| stock.name.toLowerCase().includes(normalizedSearchQuery);

		if (!matchesSearch)
			return false;

		if (trendFilter === 'gainers')
			return stock.dayChangePercent > 0;
		if (trendFilter === 'losers')
			return stock.dayChangePercent < 0;

		return true;
	});

	if (sortOption === 'name-asc') {
		// we still sort it natively if needed, but it's handled in switch.
		// wait, let's just let it fall through to switch.
	}

	return filtered.sort((a, b) => {
		switch (sortOption) {
			case 'name-asc':
				return a.name.localeCompare(b.name);
			case 'name-desc':
				return b.name.localeCompare(a.name);
			case 'price-asc':
				return a.price - b.price;
			case 'price-desc':
				return b.price - a.price;
			case 'change-asc':
				return a.dayChangePercent - b.dayChangePercent;
			case 'change-desc':
				return b.dayChangePercent - a.dayChangePercent;
			default:
				return 0;
		}
	});
}

export function getStocksSummary(stocks: Stock[]) {
	const gainersCount = stocks.filter((stock) => stock.dayChangePercent > 0).length;
	const losersCount = stocks.filter((stock) => stock.dayChangePercent < 0).length;
	const averageChange = stocks.length > 0
		? stocks.reduce(
			(total, stock) => total + stock.dayChangePercent,
			0,
		) / stocks.length
		: 0;

	return {
		gainersCount,
		losersCount,
		averageChange,
		totalCount: stocks.length,
	};
}
