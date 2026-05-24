import {
	Checkbox,
	Flex,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

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
			<Stack gap='xs' className={cls.summary}>
				<Title order={2}>{title}</Title>

				<TextInput
					value={searchQuery}
					onChange={(event) => {
						onSearchQueryChange(event.currentTarget.value);
					}}
					placeholder={searchPlaceholder}
					aria-label='Поиск акции'
					leftSection={<IconSearch size={16} />}
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
			</Stack>
		</Flex>
	);
}
