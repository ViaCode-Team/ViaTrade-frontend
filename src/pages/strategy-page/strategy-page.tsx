import { Stack } from '@mantine/core';
import { useMemo } from 'react';
import {
	generatePath,
	useParams,
} from 'react-router';

import {
	mapTradeStrategyToStrategy,
	StrategyInfoList,
	StrategyInfoListSkeleton,
	useGetAllSuspense,
	useGetByIdSuspense,
} from '@/entities/strategy';
import {
	useCreateInstrumentsLink,
	useDeleteInstrumentsLink,
	useGetAllInstrumentsLinkSuspense,
} from '@/entities/strategy/api/gen';
import { NoteForm, usePersonalNote } from '@/features/note/manage-note';
import { StrategyStockBinding } from '@/features/strategy/bind-stock';
import { ROUTES } from '@/shared/model/routes';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { BackToStrategiesLink } from './ui/back-to-strategies-link';
import { StrategyHeroBoundary } from './ui/strategy-hero';
import { StrategyNotFound } from './ui/strategy-not-found';

const INACTIVE_STRATEGY_IDS = new Set<number>();

function StrategyInfoView({ strategyId }: { strategyId: number }) {
	const strategyQuery = useGetByIdSuspense(strategyId);
	const strategy = mapTradeStrategyToStrategy(strategyQuery.data.data, INACTIVE_STRATEGY_IDS);

	return <StrategyInfoList strategy={strategy} />;
}

const StrategyInfoViewBoundary = withQueryBoundary(StrategyInfoView, {
	suspenseProps: { fallback: <StrategyInfoListSkeleton /> },
});

function StrategyPageContent() {
	const { strategyName } = useParams();
	const strategiesQuery = useGetAllSuspense();
	const decodedName = decodeURIComponent(strategyName || '').toLowerCase();
	const strategySummary = strategiesQuery.data.data.find(
		(s) => s.name.toLowerCase() === decodedName,
	);
	const strategyId = strategySummary ? strategySummary.id : null;
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
			<StrategyHeroBoundary strategyId={strategyId} />

			<StrategyInfoViewBoundary strategyId={strategyId} />

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
			<BackToStrategiesLink />
			<StrategyPageContentBoundary />
		</Stack>
	);
}
