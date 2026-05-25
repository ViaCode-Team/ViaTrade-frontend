import { Stack } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
	useMemo,
	useState,
} from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import { mockStocks } from '@/entities/stock';
import { getGetAllSuspenseQueryOptions } from '@/entities/strategy';
import { NoteForm, usePersonalNote } from '@/features/note';
import { StrategyStockBindingList } from '@/features/strategy-stock-binding';
import { ROUTES } from '@/shared/model/routes';
import { Section } from '@/shared/ui/section';

import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHero } from './ui/strategy-hero';
import { StrategyInfoGrid } from './ui/strategy-info-grid';
import { StrategyNotFound } from './ui/strategy-not-found';

export function StrategyPage() {
	const { strategyName } = useParams();
	const strategiesQuery = useSuspenseQuery(getGetAllSuspenseQueryOptions());
	const decodedName = decodeURIComponent(strategyName || '').toLowerCase();
	const strategy = strategiesQuery.data.data.find(
		(s) => s.name.toLowerCase() === decodedName,
	);
	const strategyId = strategy ? strategy.id : null;
	const hasStrategyId = strategyId !== null;
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
		</>
	);
}
