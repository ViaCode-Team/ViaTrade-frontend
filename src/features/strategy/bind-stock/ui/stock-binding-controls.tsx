import {
	Checkbox,
	Flex,
	Stack,
} from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import cls from './strategy-stock-binding-list.module.css';

type StockBindingControlsProps = {
	searchPlaceholder?: string;
	searchQuery: string;
	onSearchQueryChange: (query: string) => void;
	stocksCount: number;
	visibleStocksCount: number;
	allChecked: boolean;
	indeterminate: boolean;
	isLoading?: boolean;
	onAllChange: () => void;
};

export function StockBindingControls({
	searchPlaceholder = 'Найти акцию',
	searchQuery,
	onSearchQueryChange,
	stocksCount,
	visibleStocksCount,
	allChecked,
	indeterminate,
	isLoading,
	onAllChange,
}: StockBindingControlsProps) {
	return (
		<Flex justify='space-between' gap='md' wrap='wrap' className={cls.header}>
			<Stack gap='md' w='100%'>

				<ControlsGroup>
					<SearchInput
						value={searchQuery}
						onChange={onSearchQueryChange}
						placeholder={searchPlaceholder}
						aria-label='Поиск акции'
						disabled={stocksCount === 0}
						isLoading={isLoading}
					/>

					<Flex align='center' gap={4} wrap='wrap'>
						<Checkbox
							checked={allChecked}
							indeterminate={indeterminate}
							onChange={onAllChange}
							label={searchQuery.trim() ? 'Выбрать все найденные на странице' : 'Выбрать все на странице'}
							size='md'
							disabled={visibleStocksCount === 0}
						/>
					</Flex>
				</ControlsGroup>
			</Stack>
		</Flex>
	);
}
