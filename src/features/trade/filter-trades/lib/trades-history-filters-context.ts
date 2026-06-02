import { createContext, use } from 'react';

import type { TradeFilters } from '../model/trade-filters';

export type TradesHistoryFiltersContextType = {
	filters: TradeFilters;
	setFilters: (filters: Partial<TradeFilters>) => void;
	setFilter: <K extends keyof TradeFilters>(key: K, value: TradeFilters[K]) => void;
};

export const TradesHistoryFiltersContext = createContext<TradesHistoryFiltersContextType | null>(null);

export function useTradesHistoryFiltersContext() {
	const context = use(TradesHistoryFiltersContext);
	if (!context) {
		throw new Error('useTradesHistoryFiltersContext must be used within a TradesHistoryFiltersProvider');
	}

	return context;
}
