import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo } from 'react';

import type { Stock } from '@/entities/trade-code/stock';

import { useGetAllInstrumentsLinkSuspense } from '@/entities/strategy/api/gen';
import { StocksList, StocksListSkeleton } from '@/entities/trade-code/stock';
import {
	StocksControls,
	useStocksControls,
} from '@/features/stock/filter-stocks';
import { PageHeader } from '@/shared/ui/page-header';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { useStocksQuery, useStocksQuerySuspense } from './model/stocks-query';
import { StocksMarketSummary } from './ui/stocks-market-summary';
import { StocksStatusBarBoundary } from './ui/stocks-status-bar';
import { UserStockLinkedStrategiesModal } from './ui/user-stock-linked-strategies-modal';

function StocksListView({ onLinkedStrategiesClick }: { onLinkedStrategiesClick: (stock: Stock) => void }) {
	const { filters } = useStocksControls();
	const { data: stocks } = useStocksQuerySuspense(
		filters.searchQuery,
		filters.sortOption,
	);
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
			stocks={stocks}
			hasFilters={!!filters.searchQuery}
			linkCountsByStockId={linkCountsByStockId}
			onLinkedStrategiesClick={onLinkedStrategiesClick}
		/>
	);
}

const StocksListViewBoundary = withQueryBoundary(StocksListView, {
	suspenseProps: {
		fallback: <StocksListSkeleton />,
	},
});

export function StocksPage() {
	const { data: stocksResponse, isLoading } = useStocksQuery('', 'name-asc');
	const stocks = useMemo(() => stocksResponse ?? [], [stocksResponse]);

	function handleLinkedStrategyNavigate(modalId: string) {
		modals.close(modalId);
	}

	function openLinkedStrategiesModal(stock: Stock) {
		const modalId = `stock-linked-strategies-${stock.id}`;

		modals.open({
			modalId,
			title: `Привязанные стратегии ${stock.ticker}`,
			size: 'xl',
			centered: true,
			children: (
				<UserStockLinkedStrategiesModal
					stock={stock}
					modalId={modalId}
					onNavigate={handleLinkedStrategyNavigate}
				/>
			),
		});
	}

	return (
		<>
			<PageHeader
				title='Акции'
				description='Динамика инструментов и связанные стратегии'
			/>

			<Section>
				<StocksMarketSummary totalCount={stocks.length} isLoading={isLoading} />
			</Section>

			<Section header={{ title: 'Список акций' }}>
				<Stack>
					<Stack gap='xs'>
						<StocksControls disabled={isLoading || stocks.length === 0} isLoading={isLoading} />

						<StocksStatusBarBoundary
							totalCount={stocks.length}
						/>
					</Stack>

					<StocksListViewBoundary
						onLinkedStrategiesClick={openLinkedStrategiesModal}
					/>
				</Stack>
			</Section>
		</>
	);
}
