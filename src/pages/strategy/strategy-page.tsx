import { Flex, Stack } from '@mantine/core';
import { useMemo } from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import { useGetStrategiesSuspense } from '@/entities/strategy';
import {
	useCreateUserStrategyCode,
	useDeleteUserStrategyCode,
	useGetUserStrategyCodesSuspense,
} from '@/entities/strategy';
import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { StrategyStockBinding } from '@/features/strategy/bind-stock';
import { ROUTES } from '@/shared/model';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHeroBoundary } from './ui/strategy-hero';
import { StrategyInfoSectionBoundary } from './ui/strategy-info-section';
import { StrategyNotFound } from './ui/strategy-not-found';

function StrategyPageContent() {
	const { strategyName } = useParams();
	const strategiesQuery = useGetStrategiesSuspense({ page: 1, pageSize: 100 });
	const decodedName = decodeURIComponent(strategyName || '').toLowerCase();
	const strategySummary = strategiesQuery.data.data.items.find(
		(s) => s.name.toLowerCase() === decodedName,
	);
	const strategyId = strategySummary ? strategySummary.id : null;
	const hasStrategyId = strategyId !== null;

	const { data: instrumentsLinkResponse } = useGetUserStrategyCodesSuspense({ page: 1, pageSize: 100 });
	const serverSelectedStockIds = useMemo(
		() =>
			instrumentsLinkResponse.data.items
				.filter((link) => link.strategyId === strategyId)
				.map((link) => String(link.tradeCodeId)),
		[instrumentsLinkResponse.data.items, strategyId],
	);

	const { mutate: createLink } = useCreateUserStrategyCode();
	const { mutate: deleteLink } = useDeleteUserStrategyCode();

	const strategyNoteSource = useMemo(() => {
		if (strategyId === null) {
			return undefined;
		}

		return {
			type: 'strategy' as const,
			id: String(strategyId),
			label: strategySummary?.name ?? `Стратегия #${strategyId}`,
			description: strategySummary?.description ?? 'Торговая стратегия',
			path: generatePath(ROUTES.STRATEGY, { strategyName: strategySummary?.name ?? String(strategyId) }),
		};
	}, [strategyId, strategySummary]);
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
			<Section>
				<StrategyHeroBoundary strategyId={strategyId} />
			</Section>

			<StrategyInfoSectionBoundary strategyId={strategyId} />

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

const StrategyPageContentBoundary = withQueryBoundary(StrategyPageContent);

export function StrategyPage() {
	return (
		<Stack>
			<Flex justify='space-between' align='center'>
				<BackToStrategiesLink />
				<DataFreshness />
			</Flex>
			<StrategyPageContentBoundary />
		</Stack>
	);
}
