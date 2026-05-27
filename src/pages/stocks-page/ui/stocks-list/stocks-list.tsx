import { SimpleGrid } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';

import { type Stock, StockCard } from '@/entities/trade-code/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import type { StockSortOption, StockTrendFilter } from '../../model/stock-filters';

import { stocksQueryOptions } from '../../model/stocks-query';
import { StocksListSkeleton } from './stocks-list.skeleton';

type StocksListProps = {
	searchQuery: string;
	trendFilter: StockTrendFilter;
	sortOption: StockSortOption;
	onLinkedStrategiesClick: (stock: Stock) => void;
};

export function StocksList({
	searchQuery,
	trendFilter,
	sortOption,
	onLinkedStrategiesClick,
}: StocksListProps) {
	const { data: filteredStocks } = useSuspenseQuery(
		stocksQueryOptions(searchQuery, trendFilter, sortOption),
	);

	if (filteredStocks.length === 0) {
		return (
			<EmptyState
				title='Акции не найдены'
				description='Попробуйте изменить поисковый запрос'
			/>
		);
	}

	return (
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
	);
}

export const StocksListBoundary = withQueryBoundary(StocksList, {
	suspenseProps: {
		fallback: <StocksListSkeleton />,
	},
});
