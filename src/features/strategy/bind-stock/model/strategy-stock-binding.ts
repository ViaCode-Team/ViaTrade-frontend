import type { Stock } from '@/entities/stock';

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
	selectedStockIds: string[],
	stockId: string,
	checked: boolean,
) {
	if (checked) {
		return selectedStockIds.includes(stockId) ? selectedStockIds : [...selectedStockIds, stockId];
	}

	return selectedStockIds.filter((selectedStockId) => selectedStockId !== stockId);
}

export function getNextStockIdsAfterVisibleToggle({
	stocks,
	visibleStocks,
	selectedStockIds,
	allChecked,
}: ToggleVisibleStockSelectionParams) {
	const visibleStockIdSet = new Set(visibleStocks.map((stock) => stock.id));

	if (allChecked) {
		return selectedStockIds.filter((stockId) => !visibleStockIdSet.has(stockId));
	}

	return [...new Set([
		...selectedStockIds,
		...stocks.filter((stock) => visibleStockIdSet.has(stock.id)).map((stock) => stock.id),
	])];
}
