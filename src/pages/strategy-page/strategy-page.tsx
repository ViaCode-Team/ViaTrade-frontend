import { Stack } from '@mantine/core';
import {
	useMemo,
	useState,
} from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import { useGetAllSuspense } from '@/entities/strategy';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock } from '@/entities/trade-code/stock';
import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { StrategyStockBindingList } from '@/features/strategy/bind-stock';
import { ROUTES } from '@/shared/model/routes';
import { Section } from '@/shared/ui/section';

import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHero } from './ui/strategy-hero';
import { StrategyInfoGrid } from './ui/strategy-info-grid';
import { StrategyNotFound } from './ui/strategy-not-found';

export function StrategyPage() {
	const { strategyName } = useParams();
	const strategiesQuery = useGetAllSuspense();
	const decodedName = decodeURIComponent(strategyName || '').toLowerCase();
	const strategy = strategiesQuery.data.data.find(
		(s) => s.name.toLowerCase() === decodedName,
	);
	const strategyId = strategy ? strategy.id : null;
	const hasStrategyId = strategyId !== null;

	const { data: stocksResponse } = useGetAllStocksCodesSuspense();
	const stocks = useMemo(() => stocksResponse.data.map(mapTradeCodeToStock), [stocksResponse.data]);

	const [selectedStockIds, setSelectedStockIds] = useState<string[]>([]);
	const strategyNoteSource = useMemo(() => {
		if (strategyId === null) {
			return undefined;
		}

		return {
			type: 'strategy' as const,
			id: String(strategyId),
			label: strategy?.name ?? `Стратегия #${strategyId}`,
			description: strategy?.description ?? 'Торговая стратегия',
			path: generatePath(ROUTES.STRATEGY, { strategyName: strategy?.name ?? String(strategyId) }),
		};
	}, [strategyId, strategy]);
	const strategyNote = usePersonalNote({ source: strategyNoteSource });

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
				stocks={stocks}
				selectedStockIds={selectedStockIds}
				onSelectedStockIdsChange={handleLinkedStocksChange}
			/>

			<Section header={{ title: 'Заметка к стратегии' }}>
				<NoteForm
					{...strategyNote.noteFormProps}
					placeholder='Запишите важные условия, риски и наблюдения'
				/>
			</Section>
		</>
	);
}
