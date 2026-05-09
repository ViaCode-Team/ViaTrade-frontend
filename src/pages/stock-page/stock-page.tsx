import { Stack } from '@mantine/core';
import { useParams } from 'react-router';

import { getStockById } from '@/entities/stock';
import { NoteForm, usePersonalNote } from '@/features/note';
import { NotificationList, useNotificationList } from '@/features/notification';
import { Section } from '@/shared/ui/section';

import { BackToStocksLink } from './ui/back-to-stocks-link';
import { StockHero } from './ui/stock-hero';
import { StockNotFound } from './ui/stock-not-found';
import { StockStrategiesSection } from './ui/stock-strategies-section';

export function StockPage() {
	const { stockId } = useParams();
	const stock = getStockById(stockId);
	const stockNote = usePersonalNote();
	const notifications = useNotificationList();

	if (!stock) {
		return <StockNotFound />;
	}

	return (
		<>
			<Stack>
				<BackToStocksLink />
				<StockHero stock={stock} />
			</Stack>

			<StockStrategiesSection stock={stock} />

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
