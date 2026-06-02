import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { TradesHistoryFiltersContext } from '../lib/trades-history-filters-context';
import { defaultTradeFilters, type TradeFilters } from '../model/trade-filters';

export function TradesHistoryFiltersProvider({ children }: { children: ReactNode }) {
	const [filtersValue, setFiltersValue] = useState<TradeFilters>(defaultTradeFilters);

	const setFilters = useCallback((newFilters: Partial<TradeFilters>) => {
		setFiltersValue((prev) => ({ ...prev, ...newFilters }));
	}, []);

	const setFilter = useCallback(<K extends keyof TradeFilters>(key: K, value: TradeFilters[K]) => {
		setFiltersValue((prev) => ({ ...prev, [key]: value }));
	}, []);

	const value = useMemo(
		() => ({
			filters: filtersValue,
			setFilters,
			setFilter,
		}),
		[filtersValue, setFilters, setFilter],
	);

	return (
		<TradesHistoryFiltersContext value={value}>
			{children}
		</TradesHistoryFiltersContext>
	);
}
