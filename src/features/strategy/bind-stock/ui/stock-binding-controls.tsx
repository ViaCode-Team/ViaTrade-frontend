import {
	Checkbox,
	Flex,
	Stack,
	Title,
} from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import cls from './strategy-stock-binding-list.module.css';

type StockBindingControlsProps = {
	title: string;
	searchPlaceholder: string;
	searchQuery: string;
	stocksCount: number;
	visibleStocksCount: number;
	allChecked: boolean;
	indeterminate: boolean;
	isLoading?: boolean;
	onSearchQueryChange: (searchQuery: string) => void;
	onAllChange: () => void;
};

export function StockBindingControls({
	title,
	searchPlaceholder,
	searchQuery,
	stocksCount,
	visibleStocksCount,
	allChecked,
	indeterminate,
	isLoading,
	onSearchQueryChange,
	onAllChange,
}: StockBindingControlsProps) {
	return (
		<Flex justify='space-between' gap='md' wrap='wrap' className={cls.header}>
			<Stack gap='md' w='100%'>
				<Title order={2} className={cls.summary}>{title}</Title>

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
