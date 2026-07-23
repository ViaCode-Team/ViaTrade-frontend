import { Center, Pagination, SimpleGrid, Stack } from '@mantine/core';

import type { PaginationConfig } from '@/shared/model';

import { CONTENT_GRID_SPACING } from '@/shared/model';

import type { Stock } from '../../model';

import { StockBindingCard } from '../stock-binding-card/stock-binding-card';
import cls from './strategy-stock-binding-list.module.css';

export type StrategyStockBindingListProps = {
	paginatedStocks: Stock[];
	stocks: Stock[];
	selectedStockIds: string[];
	onStockChange: (stockId: string, checked: boolean) => void;
	pagination?: PaginationConfig;
};

export function StrategyStockBindingList({
	paginatedStocks,
	selectedStockIds,
	onStockChange,
	pagination,
}: StrategyStockBindingListProps) {
	const selectedStockIdSet = new Set(selectedStockIds);

	return (
		<Stack gap='md'>
			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{paginatedStocks.map((stock) => (
					<li key={stock.id} className={cls.item}>
						<StockBindingCard
							stock={stock}
							isSelected={selectedStockIdSet.has(stock.id)}
							onSelectedChange={onStockChange}
						/>
					</li>
				))}
			</SimpleGrid>

			{pagination && (
				<Center>
					<Pagination
						total={pagination.totalPages}
						value={pagination.page}
						onChange={pagination.onPageChange}
					/>
				</Center>
			)}
		</Stack>
	);
}
