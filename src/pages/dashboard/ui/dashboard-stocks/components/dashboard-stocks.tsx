import { useMemo } from 'react';

import type { Stock } from '@/entities/stock';

import { StocksList, StocksListSkeleton } from '@/entities/stock';
import { useGetAllInstrumentsLinkSuspense } from '@/entities/strategy';
import { useStocksQuerySuspense } from '@/features/stock/load-stocks';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function DashboardStocks({ onLinkedStrategiesClick }: { onLinkedStrategiesClick: (stock: Stock) => void }) {
	const { data: stocks } = useStocksQuerySuspense('', 'name-asc');
	const { data: instrumentsLinkResponse } = useGetAllInstrumentsLinkSuspense();

	const linkCountsByStockId = useMemo(() => {
		const counts = new Map<number, number>();
		instrumentsLinkResponse.data.forEach((link) => {
			counts.set(link.tradeCodeId, (counts.get(link.tradeCodeId) || 0) + 1);
		});
		return counts;
	}, [instrumentsLinkResponse.data]);

	return (
		<StocksList
			stocks={stocks.slice(0, 4)}
			hasFilters={false}
			linkCountsByStockId={linkCountsByStockId}
			onLinkedStrategiesClick={onLinkedStrategiesClick}
		/>
	);
}

export const DashboardStocksBoundary = withQueryBoundary(DashboardStocks, {
	suspenseProps: {
		fallback: <StocksListSkeleton />,
	},
});
