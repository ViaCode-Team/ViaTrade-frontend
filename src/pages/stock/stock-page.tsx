import { Flex, Stack } from '@mantine/core';
import { useMemo } from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import { mapTradeCodeToStock } from '@/entities/stock';
import { useGetStockCodeByTickerSuspense } from '@/entities/trade-code';
import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { StockReminds } from '@/pages/stock/ui/stock-reminds';
import { ROUTES } from '@/shared/model';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';
import { StockLinkedStrategies } from '@/widgets/stock-linked-strategies';

import { BackToStocksLink } from './ui/back-to-stocks-link';
import { StockHero } from './ui/stock-hero';

const StockPageBoundary = withQueryBoundary(StockPageBase);

export function StockPage() {
	return (
		<Stack>
			<Flex justify='space-between' align='center'>
				<BackToStocksLink />
				<DataFreshness />
			</Flex>

			<StockPageBoundary />
		</Stack>
	);
}

function StockPageBase() {
	const { stockId } = useParams();

	const { data: stockResponse } = useGetStockCodeByTickerSuspense(stockId ?? '');
	const stock = mapTradeCodeToStock(stockResponse.data);

	const stockNoteSource = useMemo(
		() => stock
			? {
					type: 'stock' as const,
					id: String(stock.instrumentId),
					label: stock.ticker,
					description: stock.name,
					path: generatePath(ROUTES.STOCK, { stockId: stock.ticker.toLowerCase() }),
				}
			: undefined,
		[stock],
	);

	const stockNote = usePersonalNote({ source: stockNoteSource });

	return (
		<>
			<StockHero stock={stock} />

			<Section
				header={{
					title: 'Привязанные стратегии',
					description: stock.ticker && `Стратегии, которые привязаны к ${stock.ticker}.`,
				}}
			>
				<StockLinkedStrategies stockId={stock.instrumentId} />
			</Section>

			<Section header={{ title: 'Заметка к акции' }}>
				<NoteForm
					{...stockNote.noteFormProps}
					placeholder='Условия входа, сценарии, риски...'
				/>
			</Section>

			<Section header={{ title: 'Напоминания к акции' }}>
				<StockReminds stock={stock} />
			</Section>
		</>
	);
}
