import { Group, Pagination, SimpleGrid, Stack } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model';
import { AppEmptyState } from '@/shared/ui/app-empty-state';

import type { Stock } from '../../model';

import { StockBindingCard } from '../stock-binding-card/stock-binding-card';
import cls from './strategy-stock-binding-list.module.css';

export { StrategyStockBindingListSkeleton } from './strategy-stock-binding-list.skeleton';

export type StrategyStockBindingListProps = {
	paginatedStocks: Stock[];
	stocks: Stock[];
	page: number;
	totalPages: number;
	selectedStockIds: string[];
	onStockChange: (stockId: string, checked: boolean) => void;
	onPageChange: (page: number) => void;
};

export function StrategyStockBindingList({
	paginatedStocks,
	page,
	totalPages,
	selectedStockIds,
	onStockChange,
	onPageChange,
}: StrategyStockBindingListProps) {
	const selectedStockIdSet = new Set(selectedStockIds);

	if (paginatedStocks.length === 0) {
		return <AppEmptyState title='Акции не найдены' />;
	}

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

			{totalPages > 1 && (
				<Group justify='center' mt='sm'>
					<Pagination
						total={totalPages}
						value={page}
						onChange={onPageChange}
						size='sm'
					/>
				</Group>
			)}
		</Stack>
	);
}
