import {
	Flex,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo, useState } from 'react';

import {
	mockStocks,
	type Stock,
	StockCard,
	StockLinkedStrategiesModal,
	type StockLinkedStrategy,
} from '@/entities/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import {
	getFilteredStocks,
	getStocksSummary,
} from './model/stock-filters';
import cls from './stocks-page.module.css';
import { StockLinkedStrategyCard } from './ui/stock-linked-strategy-card';
import { StocksControls } from './ui/stocks-controls';
import { StocksMarketSummary } from './ui/stocks-market-summary';

export function StocksPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const summary = useMemo(() => getStocksSummary(mockStocks), []);
	const filteredStocks = useMemo(
		() => getFilteredStocks({ stocks: mockStocks, searchQuery }),
		[searchQuery],
	);

	function renderLinkedStrategy(strategy: StockLinkedStrategy, modalId: string) {
		return (
			<StockLinkedStrategyCard
				strategy={strategy}
				onNavigate={() => {
					modals.close(modalId);
				}}
			/>
		);
	}

	function openLinkedStrategiesModal(stock: Stock) {
		const modalId = `stock-linked-strategies-${stock.id}`;

		modals.open({
			modalId,
			title: `Привязанные стратегии ${stock.ticker}`,
			size: 'xl',
			centered: true,
			children: (
				<StockLinkedStrategiesModal
					stock={stock}
					renderLinkedStrategy={(strategy) => renderLinkedStrategy(strategy, modalId)}
				/>
			),
		});
	}

	return (
		<>
			<Flex direction='column' gap='xs'>
				<Title order={1}>Акции</Title>
				<Text c='dimmed'>
					Следите за инструментами, динамикой дня и стратегиями, которые подходят под выбранный тикер.
				</Text>
			</Flex>

			<StocksMarketSummary {...summary} />

			<Stack>
				<StocksControls
					searchQuery={searchQuery}
					onSearchQueryChange={setSearchQuery}
				/>

				<SimpleGrid
					minColWidth={300}
					spacing={CONTENT_GRID_SPACING}
					component='ul'
					className={cls.grid}
				>
					{filteredStocks.map((stock) => (
						<li key={stock.id} className={cls.item}>
							<StockCard
								stock={stock}
								onLinkedStrategiesClick={() => {
									openLinkedStrategiesModal(stock);
								}}
							/>
						</li>
					))}
				</SimpleGrid>
			</Stack>

			{filteredStocks.length === 0 && (
				<Text size='sm' c='dimmed'>
					Акции не найдены. Измените запрос.
				</Text>
			)}
		</>
	);
}
