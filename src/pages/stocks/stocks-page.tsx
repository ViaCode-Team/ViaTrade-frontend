import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo } from 'react';

import type { Stock } from '@/entities/stock';

import { StocksList, StocksListSkeleton } from '@/entities/stock';
import { useGetUserStrategyCodesSuspense } from '@/entities/strategy';
import {
	StocksControls,
	useStocksControls,
} from '@/pages/stocks/ui/filter-stocks';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { DataState } from '@/shared/ui/data-state';
import { PageHeader } from '@/shared/ui/page-header';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { useStocksQuery, useStocksQuerySuspense } from './api/stocks-query';
import { StocksMarketSummary } from './ui/stocks-market-summary';
import { StocksStatusBarBoundary } from './ui/stocks-status-bar';
import { UserStockLinkedStrategiesModal } from './ui/user-stock-linked-strategies-modal';

function StocksListView({ onLinkedStrategiesClick }: { onLinkedStrategiesClick: (stock: Stock) => void }) {
	const { filters, setFilters } = useStocksControls();
	const { data: stocksResponse } = useStocksQuerySuspense(
		filters.searchQuery,
		filters.sortOption,
		filters.page,
	);
	const { data: instrumentsLinkResponse } = useGetUserStrategyCodesSuspense({ page: 1, pageSize: 100 });

	const linkCountsByStockId = useMemo(() => {
		const counts = new Map<number, number>();
		instrumentsLinkResponse.data.items.forEach((link) => {
			counts.set(link.tradeCodeId, (counts.get(link.tradeCodeId) || 0) + 1);
		});
		return counts;
	}, [instrumentsLinkResponse.data]);

	return (
		<DataState hasData={!!stocksResponse.data.totalCount} hasResults={!!stocksResponse.data.items.length}>
			<StocksList
				stocks={stocksResponse.data.items}
				linkCountsByStockId={linkCountsByStockId}
				onLinkedStrategiesClick={onLinkedStrategiesClick}
				pagination={{
					page: stocksResponse.data.page,
					totalPages: stocksResponse.data.totalPages,
					onPageChange: (page) => setFilters({ page: String(page) }),
				}}
			/>
		</DataState>
	);
}

const StocksListViewBoundary = withQueryBoundary(StocksListView, {
	suspenseProps: {
		fallback: <StocksListSkeleton />,
	},
});

export function StocksPage() {
	const { data: stocksResponse, isLoading } = useStocksQuery('', 'name-asc', 1);
	const stocks = useMemo(() => stocksResponse?.data.items ?? [], [stocksResponse]);

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
				rightSection={<DataFreshness />}
			/>

			<Section>
				<StocksMarketSummary isLoading={isLoading} />
			</Section>

			<Section header={{ title: 'Список акций' }}>
				<Stack>
					<Stack gap='xs'>
						<StocksControls disabled={isLoading || stocks.length === 0} isLoading={isLoading} />

						<StocksStatusBarBoundary
							totalCount={stocksResponse?.data.totalCount ?? 0}
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
