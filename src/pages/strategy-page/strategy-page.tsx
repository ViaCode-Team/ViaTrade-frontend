import { Stack } from '@mantine/core';
import { useState } from 'react';
import { useParams } from 'react-router';

import { mockStocks } from '@/entities/stock';
import { NoteForm, usePersonalNote } from '@/features/note';
import { NotificationList, useNotificationList } from '@/features/notification';
import { StrategyStockBindingList } from '@/features/strategy-stock-binding';
import { Section } from '@/shared/ui/section';

import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHero } from './ui/strategy-hero';
import { StrategyInfoGrid } from './ui/strategy-info-grid';
import { StrategyNotFound } from './ui/strategy-not-found';

export function StrategyPage() {
	const { strategyName } = useParams();
	const strategyId = getStrategyIdFromRoute(strategyName);
	const hasStrategyId = strategyId !== null;
	const [selectedStockIds, setSelectedStockIds] = useState<string[]>([]);

	const strategyNote = usePersonalNote();
	const notifications = useNotificationList();

	if (!hasStrategyId) {
		return <StrategyNotFound />;
	}

	const handleLinkedStocksChange = (nextStockIds: string[]) => {
		setSelectedStockIds(nextStockIds);

		// TODO: replace with a real strategy-stock binding mutation.
		// eslint-disable-next-line no-console
		console.info('strategy-stock-binding:update', {
			strategyId,
			stockIds: nextStockIds,
		});
	};

	return (
		<>
			<Stack>
				<BackToStrategiesLink />

				<StrategyHero strategyId={strategyId} />
			</Stack>

			<StrategyInfoGrid strategyId={strategyId} />

			<StrategyStockBindingList
				stocks={mockStocks}
				selectedStockIds={selectedStockIds}
				onSelectedStockIdsChange={handleLinkedStocksChange}
			/>

			<Section header={{ title: 'Заметка к стратегии' }}>
				<NoteForm
					{...strategyNote.noteFormProps}
					placeholder='Запишите важные условия, риски и наблюдения'
				/>
			</Section>

			<Section header={{ title: 'Уведомления' }}>
				<NotificationList {...notifications} />
			</Section>
		</>
	);
}

function getStrategyIdFromRoute(strategyName: string | undefined) {
	const strategyId = Number(strategyName);

	if (!Number.isInteger(strategyId) || strategyId <= 0) {
		return null;
	}

	return strategyId;
}
