import { Stack } from '@mantine/core';
import { useMemo } from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock } from '@/entities/trade-code/stock';
import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { StockReminds } from '@/pages/stock-page/ui/stock-reminds';
import { ROUTES } from '@/shared/model/routes';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';
import { StockLinkedStrategies } from '@/widgets/stock-linked-strategies';

import { BackToStocksLink } from './ui/back-to-stocks-link';
import { StockHero } from './ui/stock-hero';
import { StockNotFound } from './ui/stock-not-found';

function StockPageContent() {
	const { stockId } = useParams();
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();

	const normalizedStockId = stockId?.toLowerCase();
	const tradeCode = stocksResponse.data.find((tc) =>
		tc.id.toString() === normalizedStockId
		|| tc.exchangeId.toLowerCase() === normalizedStockId,
	);

	const stock = tradeCode ? mapTradeCodeToStock(tradeCode) : null;

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

	if (!stock) {
		return <StockNotFound />;
	}

	return (
		<>
			<StockHero stock={stock} />

			<Section
				header={{
					title: 'Привязанные стратегии',
					description: stock.ticker ? `Стратегии, которые привязаны к ${stock.ticker}.` : undefined,
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

const StockPageContentBoundary = withQueryBoundary(StockPageContent);

export function StockPage() {
	return (
		<Stack>
			<BackToStocksLink />
			<StockPageContentBoundary />
		</Stack>
	);
}
