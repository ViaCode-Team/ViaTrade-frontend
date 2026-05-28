import {
	Stack,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import type { Stock } from '@/entities/trade-code/stock';

import { PageHeader } from '@/shared/ui/page-header';

import {
	getStocksSummary,
	type StockSortOption,
	type StockTrendFilter,
} from './model/stock-filters';
import { stocksQueryOptions } from './model/stocks-query';
import { StocksControls } from './ui/stocks-controls';
import { StocksListBoundary } from './ui/stocks-list/stocks-list';
import { StocksMarketSummary } from './ui/stocks-market-summary';
import { UserStockLinkedStrategiesModalBoundary } from './ui/user-stock-linked-strategies-modal';

export function StocksPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState<StockSortOption>('name-asc');
	const [trendFilter, setTrendFilter] = useState<StockTrendFilter>('all');

	const { data: stocks } = useSuspenseQuery(stocksQueryOptions('', 'all', 'name-asc'));
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
				<StocksControls
					searchQuery={searchQuery}
					sortOption={sortOption}
					trendFilter={trendFilter}
					onSearchQueryChange={setSearchQuery}
					onSortOptionChange={setSortOption}
					onTrendFilterChange={setTrendFilter}
					disabled={stocks.length === 0}
				/>

				<StocksListBoundary
					searchQuery={searchQuery}
					sortOption={sortOption}
					trendFilter={trendFilter}
					onLinkedStrategiesClick={openLinkedStrategiesModal}
				/>
			</Stack>
		</>
	);
}
