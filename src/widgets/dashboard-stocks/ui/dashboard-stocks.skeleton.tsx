import { SimpleGrid } from '@mantine/core';

import { StockCardSkeleton } from '@/entities/trade-code/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export function DashboardStocksSkeleton() {
	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			<StockCardSkeleton />
			<StockCardSkeleton />
			<StockCardSkeleton />
			<StockCardSkeleton />
		</SimpleGrid>
	);
}
