import { Group, Pagination, SimpleGrid, Stack } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getFilteredStocks, getNextStockIdsAfterStockToggle } from '../model';
import { ITEMS_PER_PAGE, useStrategyStockBindingData } from '../model/use-strategy-stock-binding';
import { StockBindingCard } from './stock-binding-card';
import cls from './strategy-stock-binding-list.module.css';
import { StrategyStockBindingListSkeleton } from './strategy-stock-binding-list.skeleton';

type StrategyStockBindingListProps = {
	searchQuery: string;
	page: number;
	selectedStockIds: string[];
	onStockChange: (stockIds: string[]) => void;
	onPageChange: (page: number) => void;
};

export function StrategyStockBindingList({
	searchQuery,
	page,
	selectedStockIds,
	onStockChange,
	onPageChange,
}: StrategyStockBindingListProps) {
	const { stocks } = useStrategyStockBindingData();
	const visibleStocks = getFilteredStocks(stocks, searchQuery);
	const totalPages = Math.ceil(visibleStocks.length / ITEMS_PER_PAGE);
	const paginatedStocks = visibleStocks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	const selectedStockIdSet = new Set(selectedStockIds);

	if (paginatedStocks.length === 0) {
		return <EmptyState title='Акции не найдены' />;
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
							onSelectedChange={(stockId, checked) => {
								onStockChange(getNextStockIdsAfterStockToggle(stocks, selectedStockIds, stockId, checked));
							}}
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

export const StrategyStockBindingListBoundary = withQueryBoundary(StrategyStockBindingList, {
	suspenseProps: {
		fallback: <StrategyStockBindingListSkeleton />,
	},
});
