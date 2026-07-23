import { useUrlFilters } from '@/shared/lib/url-filters';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { sessionFiltersSchema } from './filters';

export type SessionsControlsProps = {
	disabled?: boolean;
	isLoading?: boolean;
};

export function SessionsControls({ disabled = false, isLoading = false }: SessionsControlsProps = {}) {
	const { filters, setFilters } = useUrlFilters(sessionFiltersSchema);

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.q}
				onChange={(val) => setFilters({ q: val, page: '1' })}
				placeholder='Поиск сессии...'
				disabled={disabled}
				isLoading={isLoading}
			/>
		</ControlsGroup>
	);
}
