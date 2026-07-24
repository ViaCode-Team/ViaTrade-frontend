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
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { PageHeader } from '@/shared/ui/page-header';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { STOCKS_PAGE_SIZE, useStocksQuerySuspense } from './api/stocks-query';
import { StocksMarketSummary } from './ui/stocks-market-summary';
import { UserStockLinkedStrategiesModal } from './ui/user-stock-linked-strategies-modal';

function StocksListView({ onLinkedStrategiesClick }: { onLinkedStrategiesClick: (stock: Stock) => void }) {
	const { filters, setFilters, resetFilters } = useStocksControls();
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
		<DataState
			hasData={!!stocksResponse.data.totalCount}
			hasResults={!!stocksResponse.data.items.length}
			onResetFilters={resetFilters}
		>
			<Stack gap='md'>
				<ListStatusBar
					totalCount={stocksResponse.data.totalCount}
					filteredCount={stocksResponse.data.items.length}
					pagination={{
						page: stocksResponse.data.page,
						pageSize: STOCKS_PAGE_SIZE,
						showRange: !filters.searchQuery.trim(),
					}}
				/>
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
			</Stack>
		</DataState>
	);
}

const StocksListViewBoundary = withQueryBoundary(StocksListView, {
	suspenseProps: {
		fallback: <StocksListSkeleton />,
	},
});

export function StocksPage() {
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
				<StocksMarketSummary />
			</Section>

			<Section header={{ title: 'Список акций' }}>
				<Stack>
					<StocksControls />

					<StocksListViewBoundary
						onLinkedStrategiesClick={openLinkedStrategiesModal}
					/>
				</Stack>
			</Section>
		</>
	);
}
