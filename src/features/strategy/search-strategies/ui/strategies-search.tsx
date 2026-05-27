import { useSearchParams } from 'react-router';

import { useGetAll } from '@/entities/strategy';
import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

export function StrategiesSearch() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('q') || '';

	const { data, isLoading } = useGetAll();
	const disabled = isLoading || (data?.data.length === 0);

	const handleSearchChange = (query: string) => {
		setSearchParams((prev) => {
			if (query) {
				prev.set('q', query);
			}
			else {
				prev.delete('q');
			}
			return prev;
		});
	};

	return (
		<FiltersGroup>
			<SearchInput
				value={searchQuery}
				onChange={(event) => handleSearchChange(event.currentTarget.value)}
				placeholder='Поиск по названию стратегии'
				disabled={disabled}
			/>
		</FiltersGroup>
	);
}
