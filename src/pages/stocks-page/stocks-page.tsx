import {
	Flex,
	SimpleGrid,
	Text,
	Title,
} from '@mantine/core';
import { useMemo, useState } from 'react';

import { mockStocks } from '@/entities/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import {
	getFilteredStocks,
	getStocksSummary,
} from './model/stock-filters';
import cls from './stocks-page.module.css';
import { StockCard } from './ui/stock-card';
import { StocksControls } from './ui/stocks-controls';
import { StocksMarketSummary } from './ui/stocks-market-summary';

export function StocksPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const summary = useMemo(() => getStocksSummary(mockStocks), []);
	const filteredStocks = useMemo(
		() => getFilteredStocks({ stocks: mockStocks, searchQuery }),
		[searchQuery],
	);

	return (
		<>
			<Flex direction='column' gap='xs'>
				<Title order={1}>Акции</Title>
				<Text c='dimmed'>
					Следите за инструментами, динамикой дня и стратегиями, которые подходят под выбранный тикер.
				</Text>
			</Flex>

			<StocksMarketSummary {...summary} />

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
						<StockCard stock={stock} />
					</li>
				))}
			</SimpleGrid>

			{filteredStocks.length === 0 && (
				<Text size='sm' c='dimmed'>
					Акции не найдены. Измените запрос.
				</Text>
			)}
		</>
	);
}
