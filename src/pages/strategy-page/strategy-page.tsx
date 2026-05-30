import { Stack } from '@mantine/core';
import { useMemo } from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import { useGetAllSuspense } from '@/entities/strategy';
import {
	useCreateInstrumentsLink,
	useDeleteInstrumentsLink,
	useGetAllInstrumentsLinkSuspense,
} from '@/entities/strategy/api/gen';
import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { StrategyStockBinding } from '@/features/strategy/bind-stock';
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

	const { data: instrumentsLinkResponse } = useGetAllInstrumentsLinkSuspense();
	const serverSelectedStockIds = useMemo(
		() =>
			instrumentsLinkResponse.data
				.filter((link) => link.strategyId === strategyId)
				.map((link) => String(link.tradeCodeId)),
		[instrumentsLinkResponse.data, strategyId],
	);

	const { mutate: createLink } = useCreateInstrumentsLink();
	const { mutate: deleteLink } = useDeleteInstrumentsLink();

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
		if (!hasStrategyId)
			return;

		const added = nextStockIds.filter((id) => !serverSelectedStockIds.includes(id));
		const removed = serverSelectedStockIds.filter((id) => !nextStockIds.includes(id));

		added.forEach((id) => {
			createLink({ data: { strategyId, tradeCodeId: Number(id) } });
		});

		removed.forEach((id) => {
			deleteLink({ params: { strategyId, tradeCodeId: Number(id) } });
		});
	};

	return (
		<>
			<Stack>
				<BackToStrategiesLink />

				<StrategyHero strategyId={strategyId} />
			</Stack>

			<StrategyInfoGrid strategyId={strategyId} />

			<Section header={{ title: 'Связанные акции' }}>
				<StrategyStockBinding
					selectedStockIds={serverSelectedStockIds}
					onSelectedStockIdsChange={handleLinkedStocksChange}
				/>
			</Section>

			<Section header={{ title: 'Заметка к стратегии' }}>
				<NoteForm
					{...strategyNote.noteFormProps}
					placeholder='Условия, риски, наблюдения...'
				/>
			</Section>
		</>
	);
}
