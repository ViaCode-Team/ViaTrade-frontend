import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo } from 'react';

import type { Stock } from '@/entities/trade-code/stock';

import {
	getStocksSummary,
	StocksControls,
	useStocksControls,
} from '@/features/stock/filter-stocks';
import { PageHeader } from '@/shared/ui/page-header';

import { useStocksQuery } from './model/stocks-query';
import { StocksListBoundary } from './ui/stocks-list/stocks-list';
import { StocksMarketSummary } from './ui/stocks-market-summary';
import { StocksStatusBarBoundary } from './ui/stocks-status-bar';
import { UserStockLinkedStrategiesModalBoundary } from './ui/user-stock-linked-strategies-modal';

export function StocksPage() {
	const { filters } = useStocksControls();

	const { data: stocks } = useStocksQuery('', 'all', 'name-asc');
	const summary = useMemo(() => getStocksSummary(stocks), [stocks]);

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
				<UserStockLinkedStrategiesModalBoundary
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
				description='Следите за инструментами, динамикой дня и стратегиями, которые подходят под выбранный тикер.'
			/>

			<StocksMarketSummary {...summary} />

			<Stack>
				<Stack gap='xs'>
					<StocksControls disabled={stocks.length === 0} />

					<StocksStatusBarBoundary
						searchQuery={filters.searchQuery}
						sortOption={filters.sortOption}
						trendFilter={filters.trendFilter}
						totalCount={stocks.length}
					/>
				</Stack>

				<StocksListBoundary
					searchQuery={filters.searchQuery}
					sortOption={filters.sortOption}
					trendFilter={filters.trendFilter}
					onLinkedStrategiesClick={openLinkedStrategiesModal}
				/>
			</Stack>
		</>
	);
}
