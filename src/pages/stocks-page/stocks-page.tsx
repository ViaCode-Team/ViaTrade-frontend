import {
	Stack,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo, useState } from 'react';

import {
	mockStocks,
	type Stock,
} from '@/entities/stock';
import { PageHeader } from '@/shared/ui/page-header';

import { getStocksSummary } from './model/stock-filters';
import { StockLinkedStrategiesModalContentBoundary } from './ui/stock-linked-strategies-modal-content';
import { StocksControls } from './ui/stocks-controls';
import { StocksListBoundary } from './ui/stocks-list/stocks-list';
import { StocksMarketSummary } from './ui/stocks-market-summary';

export function StocksPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const summary = useMemo(() => getStocksSummary(mockStocks), []);

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
				<StockLinkedStrategiesModalContentBoundary
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
					onSearchQueryChange={setSearchQuery}
				/>

				<StocksListBoundary
					searchQuery={searchQuery}
					onLinkedStrategiesClick={openLinkedStrategiesModal}
				/>
			</Stack>
		</>
	);
}
