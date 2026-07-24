import type { TradeFilters } from './trade-filters';

import { useTradesHistoryFilters } from './use-trades-history-filters';

export function useTradesHistoryControls() {
	const { q, typeFilter, statusFilter, setFilters } = useTradesHistoryFilters();

	const handleSearch = (val: TradeFilters['q']) => {
		setFilters({ q: val, page: '1' });
	};

	const handleTypeFilter = (val: TradeFilters['typeFilter']) => {
		setFilters({ typeFilter: val, page: '1' });
	};

	const handleStatusFilter = (val: TradeFilters['statusFilter']) => {
		setFilters({ statusFilter: val, page: '1' });
	};

	return {
		q,
		handleSearch,
		typeFilter,
		handleTypeFilter,
		statusFilter,
		handleStatusFilter,
	};
}
