import { Stack } from '@mantine/core';
import { useParams } from 'react-router';

import type { Stock } from '@/entities/stock';

import { getStockById } from '@/entities/stock';
import { NoteForm, usePersonalNote } from '@/features/note';
import { NotificationList, useNotificationList } from '@/features/notification';
import { Section } from '@/shared/ui/section';

import { BackToStocksLink } from './ui/back-to-stocks-link';
import { StockHero } from './ui/stock-hero';
import { StockNotFound } from './ui/stock-not-found';
import { StockStrategiesSectionBoundary } from './ui/stock-strategies-section';

export function StockPage() {
	const { stockId } = useParams();
	const stock = getStockById(stockId);

	if (!stock) {
		return <StockNotFound />;
	}

	return <StockPageContent stock={stock} />;
}

type StockPageContentProps = {
	stock: Stock;
};

function StockPageContent({ stock }: StockPageContentProps) {
	const stockNote = usePersonalNote();
	const notifications = useNotificationList();

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

			<Section header={{ title: 'Уведомления' }}>
				<NotificationList {...notifications} />
			</Section>
		</>
	);
}
