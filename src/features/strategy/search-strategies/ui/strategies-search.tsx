import { SegmentedControl, Select } from '@mantine/core';
import { useSearchParams } from 'react-router';

import { useGetAll } from '@/entities/strategy';
import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

export type StrategySortOption = 'name-asc' | 'name-desc' | 'accuracy-desc' | 'accuracy-asc';
export type StrategyStatusFilter = 'all' | 'active' | 'inactive';

const strategySortOptions = [
	{ value: 'name-asc', label: 'По названию (от А до Я)' },
	{ value: 'name-desc', label: 'По названию (от Я до А)' },
	{ value: 'accuracy-desc', label: 'По точности (убывание)' },
	{ value: 'accuracy-asc', label: 'По точности (возрастание)' },
];

export function StrategiesSearch() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('q') || '';
	const sortOption = (searchParams.get('sort') as StrategySortOption) || 'name-asc';
	const statusFilter = (searchParams.get('filter') as StrategyStatusFilter) || 'all';

	const { data, isLoading } = useGetAll();
	const disabled = isLoading || (data?.data.length === 0);

	const updateSearchParams = (key: string, value: string | null) => {
		setSearchParams((prev) => {
			if (value && value !== 'name-asc' && value !== 'all') {
				prev.set(key, value);
			}
			else {
				prev.delete(key);
			}
			return prev;
		});
	};

	return (
		<FiltersGroup>
			<SearchInput
				value={searchQuery}
				onChange={(val) => updateSearchParams('q', val)}
				placeholder='Поиск по названию стратегии'
				disabled={disabled}
				isLoading={isLoading}
			/>

			<Select
				data={strategySortOptions}
				value={sortOption}
				onChange={(val) => updateSearchParams('sort', val)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>

			<SegmentedControl
				value={statusFilter}
				onChange={(val) => updateSearchParams('filter', val)}
				size='sm'
				data={[
					{ label: 'Все', value: 'all' },
					{ label: 'Активные', value: 'active' },
					{ label: 'Неактивные', value: 'inactive' },
				]}
				disabled={disabled}
			/>
		</FiltersGroup>
	);
}
