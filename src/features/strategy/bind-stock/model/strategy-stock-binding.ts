import type { Stock } from '@/entities/trade-code/stock';

type StockSelectionState = {
	selectedCount: number;
	selectedVisibleCount: number;
	allChecked: boolean;
	indeterminate: boolean;
};

type ToggleVisibleStockSelectionParams = {
	stocks: Stock[];
	visibleStocks: Stock[];
	selectedStockIds: string[];
	allChecked: boolean;
};

export function getNormalizedStockSearchQuery(searchQuery: string) {
	return searchQuery.trim().toLowerCase();
}

export function getFilteredStocks(stocks: Stock[], searchQuery: string) {
	const normalizedSearchQuery = getNormalizedStockSearchQuery(searchQuery);

	if (!normalizedSearchQuery) {
		return stocks;
	}

	return stocks.filter((stock) =>
		stock.ticker.toLowerCase().includes(normalizedSearchQuery)
		|| stock.name.toLowerCase().includes(normalizedSearchQuery),
	);
}

export function getStockSelectionState(
	stocks: Stock[],
	visibleStocks: Stock[],
	selectedStockIds: string[],
): StockSelectionState {
	const selectedStockIdSet = new Set(selectedStockIds);
	const selectedCount = stocks.filter((stock) => selectedStockIdSet.has(stock.id)).length;
	const selectedVisibleCount = visibleStocks.filter((stock) => selectedStockIdSet.has(stock.id)).length;
	const allChecked = visibleStocks.length > 0 && selectedVisibleCount === visibleStocks.length;

	return {
		selectedCount,
		selectedVisibleCount,
		allChecked,
		indeterminate: selectedVisibleCount > 0 && !allChecked,
	};
}

export function getNextStockIdsAfterStockToggle(
	stocks: Stock[],
	selectedStockIds: string[],
	stockId: string,
	checked: boolean,
) {
	const selectedStockIdSet = new Set(selectedStockIds);

	if (checked) {
		return stocks
			.filter((stock) => stock.id === stockId || selectedStockIdSet.has(stock.id))
			.map((stock) => stock.id);
	}

	return selectedStockIds.filter((selectedStockId) => selectedStockId !== stockId);
}

export function getNextStockIdsAfterVisibleToggle({
	stocks,
	visibleStocks,
	selectedStockIds,
	allChecked,
}: ToggleVisibleStockSelectionParams) {
	const selectedStockIdSet = new Set(selectedStockIds);
	const visibleStockIdSet = new Set(visibleStocks.map((stock) => stock.id));

	if (allChecked) {
		return selectedStockIds.filter((stockId) => !visibleStockIdSet.has(stockId));
	}

	return stocks
		.filter((stock) => selectedStockIdSet.has(stock.id) || visibleStockIdSet.has(stock.id))
		.map((stock) => stock.id);
}
