import { useGetSessions } from '@/entities/auth';
import { normalizeUserSessions } from '@/features/session/manage-sessions';
import { useUrlFilters } from '@/shared/lib/hooks';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

const defaultFilters = {
	sq: '',
};

export function SessionsControls() {
	const { filters, setFilter } = useUrlFilters(defaultFilters);

	const { data, isLoading } = useGetSessions();
	const sessions = data?.data ? normalizeUserSessions(data.data) : [];
	const disabled = isLoading || (sessions.length === 0);

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.sq}
				onChange={(val) => setFilter('sq', val)}
				placeholder='Поиск по устройству/браузеру...'
				disabled={disabled}
				isLoading={isLoading}
			/>
		</ControlsGroup>
	);
}
