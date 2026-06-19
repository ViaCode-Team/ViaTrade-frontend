import type { Stock } from '@/entities/stock';

export type StockSortOption = 'name-asc' | 'name-desc';

export const stockSortOptions = [
	{ value: 'name-asc', label: 'По названию (от А до Я)' },
	{ value: 'name-desc', label: 'По названию (от Я до А)' },
];

export function getFilteredStocks({
	stocks,
	searchQuery,
	sortOption = 'name-asc',
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
			default:
				return 0;
		}
	});
}
