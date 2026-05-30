import { SimpleGrid, Stack } from '@mantine/core';
import { useMemo } from 'react';

import type { StockSortOption, StockTrendFilter } from '@/features/stock/filter-stocks';

import { useGetAllInstrumentsLinkSuspense } from '@/entities/strategy/api/gen';
import { type Stock, StockCard } from '@/entities/trade-code/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

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
	const { data: instrumentsLinkResponse } = useGetAllInstrumentsLinkSuspense();

	const linkCountsByStockId = useMemo(() => {
		const counts = new Map<number, number>();
		instrumentsLinkResponse.data.forEach((link) => {
			counts.set(link.tradeCodeId, (counts.get(link.tradeCodeId) || 0) + 1);
		});
		return counts;
	}, [instrumentsLinkResponse.data]);

	const filteredStocks = limit ? stocks.slice(0, limit) : stocks;

	if (filteredStocks.length === 0) {
		const hasFilters = Boolean(searchQuery) || trendFilter !== 'all';

		if (!hasFilters) {
			return (
				<Stack gap='md'>
					<EmptyState
						title='Нет акций'
						description='В системе пока нет доступных акций.'
					/>
				</Stack>
			);
		}

		return (
			<Stack gap='md'>
				<EmptyState
					title='Ничего не найдено'
					description='Попробуйте изменить поисковый запрос или фильтры.'
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
							linkedStrategiesCount={linkCountsByStockId.get(stock.instrumentId) || 0}
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
