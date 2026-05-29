import { SimpleGrid } from '@mantine/core';

import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { StockCard } from '@/entities/trade-code/stock';
import { mapTradeCodeToStock } from '@/entities/trade-code/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { DashboardStocksSkeleton } from './dashboard-stocks.skeleton';

export function DashboardStocks() {
	const { data: response } = useGetAllStocksCodesSuspense();

	const stocks = response.data.map(mapTradeCodeToStock).slice(0, 4);

	if (stocks.length === 0) {
		return <EmptyState title='Нет доступных акций' />;
	}

	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			{stocks.map((stock) => (
				<StockCard
					key={stock.id}
					stock={stock}
					onLinkedStrategiesClick={() => {}}
				/>
			))}
		</SimpleGrid>
	);
}

export const DashboardStocksBoundary = withQueryBoundary(DashboardStocks, {
	suspenseProps: {
		fallback: <DashboardStocksSkeleton />,
	},
});
