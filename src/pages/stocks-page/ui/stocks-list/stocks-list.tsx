import { Badge, SimpleGrid, Stack } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';

import { type Stock, StockCard } from '@/entities/trade-code/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import type { StockSortOption, StockTrendFilter } from '../../model/stock-filters';

import { stocksQueryOptions } from '../../model/stocks-query';
import { StocksListSkeleton } from './stocks-list.skeleton';

type StocksListProps = {
	searchQuery: string;
	trendFilter: StockTrendFilter;
	sortOption: StockSortOption;
	totalCount: number;
	onLinkedStrategiesClick: (stock: Stock) => void;
};

export function StocksList({
	searchQuery,
	trendFilter,
	sortOption,
	totalCount,
	onLinkedStrategiesClick,
}: StocksListProps) {
	const { data: filteredStocks } = useSuspenseQuery(
		stocksQueryOptions(searchQuery, trendFilter, sortOption),
	);

	if (filteredStocks.length === 0) {
		return (
			<Stack gap='md'>
				<ListStatusBar
					totalCount={totalCount}
					filteredCount={0}
					refreshIntervalText='Автообновление: 1 мин'
				/>
				<EmptyState
					title='Акции не найдены'
					description='Попробуйте изменить поисковый запрос'
				/>
			</Stack>
		);
	}

	const gainersCount = filteredStocks.filter((s) => s.dayChangePercent > 0).length;
	const losersCount = filteredStocks.filter((s) => s.dayChangePercent < 0).length;

	return (
		<Stack gap='md'>
			<ListStatusBar
				totalCount={totalCount}
				filteredCount={filteredStocks.length}
				refreshIntervalText='Автообновление: 1 мин'
				badges={(
					<>
						<Badge variant='dot' color='green' size='sm'>
							Растут:
							{gainersCount}
						</Badge>
						<Badge variant='dot' color='red' size='sm'>
							Падают:
							{losersCount}
						</Badge>
					</>
				)}
			/>

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
