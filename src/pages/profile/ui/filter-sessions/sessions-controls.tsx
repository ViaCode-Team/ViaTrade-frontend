import { useGetSessions } from '@/entities/auth';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { normalizeUserSessions } from '../session-entity';
import { sessionFiltersSchema } from './filters';

export function SessionsControls() {
	const { filters, setFilter } = useUrlFilters(sessionFiltersSchema);

	const { data, isLoading } = useGetSessions();
	const sessions = data?.data ? normalizeUserSessions(data.data) : [];
	const disabled = isLoading || (sessions.length === 0);

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.q}
				onChange={(val) => setFilter('q', val)}
				placeholder='Поиск сессии...'
				disabled={disabled}
				isLoading={isLoading}
			/>
		</ControlsGroup>
	);
}
