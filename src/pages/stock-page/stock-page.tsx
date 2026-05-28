import { Stack } from '@mantine/core';
import { useMemo } from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import type { Stock } from '@/entities/trade-code/stock';

import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock } from '@/entities/trade-code/stock';
import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { ROUTES } from '@/shared/model/routes';
import { Section } from '@/shared/ui/section';
import { StockReminds } from '@/widgets/stock-reminds';

import { BackToStocksLink } from './ui/back-to-stocks-link';
import { StockHero } from './ui/stock-hero';
import { StockNotFound } from './ui/stock-not-found';
import { StockStrategiesSectionBoundary } from './ui/stock-strategies-section';

export function StockPage() {
	const { stockId } = useParams();
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();

	const normalizedStockId = stockId?.toLowerCase();
	const tradeCode = stocksResponse.data.find((tc) =>
		tc.id.toString() === normalizedStockId
		|| tc.exchangeId.toLowerCase() === normalizedStockId,
	);

	const stock = tradeCode ? mapTradeCodeToStock(tradeCode) : null;

	if (!stock) {
		return <StockNotFound />;
	}

	return <StockPageContent stock={stock} />;
}

type StockPageContentProps = {
	stock: Stock;
};

function StockPageContent({ stock }: StockPageContentProps) {
	const stockNoteSource = useMemo(
		() => ({
			type: 'stock' as const,
			id: String(stock.instrumentId),
			label: stock.ticker,
			description: stock.name,
			path: generatePath(ROUTES.STOCK, { stockId: stock.ticker.toLowerCase() }),
		}),
		[stock.id, stock.instrumentId, stock.name, stock.ticker],
	);
	const stockNote = usePersonalNote({ source: stockNoteSource });

	return (
		<>
			<Stack>
				<BackToStocksLink />
				<StockHero stock={stock} />
			</Stack>

			<StockStrategiesSectionBoundary stock={stock} />

			<Section header={{ title: 'Заметка к акции' }}>
				<NoteForm
					{...stockNote.noteFormProps}
					placeholder='Запишите уровни, сценарии и условия входа'
				/>
			</Section>

			<Section header={{ title: 'Напоминания' }}>
				<StockReminds stock={stock} />
			</Section>
		</>
	);
}
