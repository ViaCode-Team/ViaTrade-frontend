import { SegmentedControl } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { useTradesHistoryControls } from '../lib/use-trades-history-controls';

export function TradesHistoryControls() {
	const {
		q,
		handleSearch,
		typeFilter,
		handleTypeFilter,
		statusFilter,
		handleStatusFilter,
		isFetching,
	} = useTradesHistoryControls();

	return (
		<ControlsGroup align='flex-end'>
			<SearchInput
				placeholder='Поиск'
				value={q}
				onChange={handleSearch}
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
				onChange={(val) => handleTypeFilter(val)}
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
				onChange={(val) => handleStatusFilter(val)}
				w={{ base: '100%', sm: 'auto' }}
				disabled={isFetching}
			/>
		</ControlsGroup>
	);
}
