import { SegmentedControl } from '@mantine/core';

import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

type TradesHistoryControlsProps = {
	search: string;
	onSearchChange: (val: string) => void;
	typeFilter: 'all' | 'long' | 'short';
	onTypeFilterChange: (val: 'all' | 'long' | 'short') => void;
	statusFilter: 'all' | 'open' | 'closed';
	onStatusFilterChange: (val: 'all' | 'open' | 'closed') => void;
	isFetching: boolean;
};

export function TradesHistoryControls({
	search,
	onSearchChange,
	typeFilter,
	onTypeFilterChange,
	statusFilter,
	onStatusFilterChange,
	isFetching,
}: TradesHistoryControlsProps) {
	return (
		<FiltersGroup p={{ base: 'xs', sm: 'md' }} pb={{ base: 'xs', sm: 'sm' }} align='flex-end'>
			<SearchInput
				placeholder='Поиск...'
				value={search}
				onChange={onSearchChange}
				miw={{ base: '100%', sm: 250 }}
				isLoading={isFetching}
				disabled={isFetching}
			/>
			<SegmentedControl
				data={[
					{ value: 'all', label: 'Все типы' },
					{ value: 'long', label: 'Long' },
					{ value: 'short', label: 'Short' },
				]}
				value={typeFilter}
				onChange={(val) => onTypeFilterChange(val as any)}
				w={{ base: '100%', sm: 'auto' }}
				disabled={isFetching}
			/>
			<SegmentedControl
				data={[
					{ value: 'all', label: 'Все статусы' },
					{ value: 'open', label: 'Открытые' },
					{ value: 'closed', label: 'Закрытые' },
				]}
				value={statusFilter}
				onChange={(val) => onStatusFilterChange(val as any)}
				w={{ base: '100%', sm: 'auto' }}
				disabled={isFetching}
			/>
		</FiltersGroup>
	);
}
