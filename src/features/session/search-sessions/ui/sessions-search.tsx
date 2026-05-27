import { useSearchParams } from 'react-router';

import { useGetSessions } from '@/entities/auth';
import { normalizeUserSessions } from '@/features/session/manage-sessions';
import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

export function SessionsSearch() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('sq') || '';

	const { data, isLoading } = useGetSessions();
	const sessions = data?.data ? normalizeUserSessions(data.data) : [];
	const disabled = isLoading || (sessions.length === 0);

	const handleSearchChange = (query: string) => {
		setSearchParams((prev) => {
			if (query) {
				prev.set('sq', query);
			}
			else {
				prev.delete('sq');
			}
			return prev;
		});
	};

	return (
		<FiltersGroup>
			<SearchInput
				value={searchQuery}
				onChange={(event) => handleSearchChange(event.currentTarget.value)}
				placeholder='Поиск по устройству/браузеру...'
				disabled={disabled}
			/>
		</FiltersGroup>
	);
}
