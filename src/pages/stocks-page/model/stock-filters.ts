import type { Stock } from '@/entities/stock';

export function getFilteredStocks({
	stocks,
	searchQuery,
}: {
	stocks: Stock[];
	searchQuery: string;
}) {
	const normalizedSearchQuery = searchQuery.trim().toLowerCase();

	return stocks.filter((stock) => {
		return normalizedSearchQuery.length === 0
			|| stock.ticker.toLowerCase().includes(normalizedSearchQuery)
			|| stock.name.toLowerCase().includes(normalizedSearchQuery);
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
