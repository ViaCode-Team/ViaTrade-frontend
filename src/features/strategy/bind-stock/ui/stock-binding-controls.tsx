import {
	Checkbox,
	Flex,
	Stack,
	Text,
	Title,
} from '@mantine/core';

import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { getNormalizedStockSearchQuery } from '../model';
import cls from './strategy-stock-binding-list.module.css';

type StockBindingControlsProps = {
	title: string;
	searchPlaceholder: string;
	searchQuery: string;
	selectedCount: number;
	stocksCount: number;
	visibleStocksCount: number;
	allChecked: boolean;
	indeterminate: boolean;
	onSearchQueryChange: (searchQuery: string) => void;
	onAllChange: () => void;
};

export function StockBindingControls({
	title,
	searchPlaceholder,
	searchQuery,
	selectedCount,
	stocksCount,
	visibleStocksCount,
	allChecked,
	indeterminate,
	onSearchQueryChange,
	onAllChange,
}: StockBindingControlsProps) {
	const normalizedSearchQuery = getNormalizedStockSearchQuery(searchQuery);

	return (
		<Flex justify='space-between' gap='md' wrap='wrap' className={cls.header}>
			<Stack gap='md' w='100%'>
				<Title order={2} className={cls.summary}>{title}</Title>

				<FiltersGroup>
					<SearchInput
						value={searchQuery}
						onChange={(event) => {
							onSearchQueryChange(event.currentTarget.value);
						}}
						placeholder={searchPlaceholder}
						aria-label='Поиск акции'
						disabled={stocksCount === 0}
					/>

					<Flex align='center' gap={4} wrap='wrap'>
						<Checkbox
							checked={allChecked}
							indeterminate={indeterminate}
							onChange={onAllChange}
							label={normalizedSearchQuery ? 'Все найденные' : 'Все акции'}
							size='md'
							disabled={visibleStocksCount === 0}
						/>

						<Text size='sm' c='dimmed'>
							Выбрано
							{' '}
							<Text span fw='bold' c='var(--mantine-color-text)'>
								{selectedCount}
							</Text>
							{' '}
							из
							{' '}
							{stocksCount}
						</Text>
					</Flex>
				</FiltersGroup>
			</Stack>
		</Flex>
	);
}
