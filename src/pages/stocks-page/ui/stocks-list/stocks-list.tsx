import { SimpleGrid, Stack } from '@mantine/core';

import { type Stock, StockCard } from '@/entities/trade-code/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import type { StockSortOption, StockTrendFilter } from '../../model/stock-filters';

import { useStocksQuery } from '../../model/stocks-query';
import { StocksListSkeleton } from './stocks-list.skeleton';

type StocksListProps = {
	searchQuery: string;
	trendFilter: StockTrendFilter;
	sortOption: StockSortOption;
	limit?: number;
	onLinkedStrategiesClick: (stock: Stock) => void;
};

export function StocksList({
	searchQuery,
	trendFilter,
	sortOption,
	limit,
	onLinkedStrategiesClick,
}: StocksListProps) {
	const { data: stocks } = useStocksQuery(searchQuery, trendFilter, sortOption);

	const filteredStocks = limit ? stocks.slice(0, limit) : stocks;

	if (filteredStocks.length === 0) {
		return (
			<Stack gap='md'>
				<EmptyState
					title='Акции не найдены'
					description='Попробуйте изменить поисковый запрос'
				/>
			</Stack>
		);
	}

	return (
		<Stack gap='md'>
			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{filteredStocks.map((stock) => (
					<li key={stock.id}>
						<StockCard
							stock={stock}
							onLinkedStrategiesClick={() => {
								onLinkedStrategiesClick(stock);
							}}
						/>
					</li>
				))}
			</SimpleGrid>
		</Stack>
	);
}

export const StocksListBoundary = withQueryBoundary(StocksList, {
	suspenseProps: {
		fallback: <StocksListSkeleton />,
	},
});
