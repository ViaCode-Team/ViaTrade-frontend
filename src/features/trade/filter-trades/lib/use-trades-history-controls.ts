import { useIsFetching } from '@tanstack/react-query';

import { getGetByUserQueryKey } from '@/entities/statistic/api/gen';
import { useUrlFilters } from '@/shared/lib/hooks';

import type { SortDirection, SortField } from '../model/trade-filters';

const defaultFilters = {
	search: '',
	typeFilter: 'all' as 'all' | 'long' | 'short',
	statusFilter: 'all' as 'all' | 'open' | 'closed',
	sortField: 'dateOpen' as SortField,
	sortDirection: 'desc' as SortDirection,
	page: '1',
};

export function useTradesHistoryControls() {
	const isFetchingTrades = useIsFetching({ queryKey: getGetByUserQueryKey() });

	const { filters, setFilters, setFilter } = useUrlFilters(defaultFilters);
	const {
		search,
		typeFilter,
		statusFilter,
		sortField,
		sortDirection,
	} = filters;
	const page = Number.parseInt(filters.page, 10) || 1;

	const handleSearch = (val: string) => {
		setFilters({ search: val, page: '1' });
	};

	const handleTypeFilter = (val: 'all' | 'long' | 'short' | string | null) => {
		setFilters({ typeFilter: val, page: '1' });
	};

	const handleStatusFilter = (val: 'all' | 'open' | 'closed' | string | null) => {
		setFilters({ statusFilter: val, page: '1' });
	};

	const setSorting = (field: SortField) => {
		const reversed = field === sortField ? sortDirection === 'desc' : false;
		setFilters({
			sortDirection: reversed ? 'asc' : 'desc',
			sortField: field,
			page: '1',
		});
	};

	const setPage = (val: number) => {
		setFilter('page', val.toString());
	};

	return {
		search,
		handleSearch,
		typeFilter,
		handleTypeFilter,
		statusFilter,
		handleStatusFilter,
		sortField,
		sortDirection,
		setSorting,
		page,
		setPage,
		isFetching: isFetchingTrades > 0,
	};
}
