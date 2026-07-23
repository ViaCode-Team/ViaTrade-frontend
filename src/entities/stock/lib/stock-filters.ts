import type { Stock } from '../model';

export type StockSortOption = 'name-asc' | 'name-desc';

export const stockSortOptions = [
	{ value: 'name-asc', label: 'По названию (от А до Я)' },
	{ value: 'name-desc', label: 'По названию (от Я до А)' },
];

export function getFilteredStocks({
	stocks,
	searchQuery,
	sortOption: _sortOption = 'name-asc',
}: {
	stocks: Stock[];
	searchQuery: string;
	sortOption?: StockSortOption;
}) {
	const normalizedSearchQuery = searchQuery.trim().toLowerCase();

	const filtered = stocks.filter((stock) => {
		const matchesSearch = normalizedSearchQuery.length === 0
			|| stock.ticker.toLowerCase().includes(normalizedSearchQuery)
			|| stock.name.toLowerCase().includes(normalizedSearchQuery);

		if (!matchesSearch)
			return false;

		return true;
	});

	return filtered;
}
