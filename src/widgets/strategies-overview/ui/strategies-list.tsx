import { Button, SimpleGrid, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';

import {
	StrategyCard,
	toStrategyCardStrategy,
} from '@/entities/strategy';
import { StrategyStockBinding } from '@/features/strategy/bind-stock';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStrategiesOverview } from '../lib/use-strategies-overview';
import { StrategiesListSkeleton } from './strategies-list.skeleton';

type Strategy = ReturnType<typeof useStrategiesOverview>['strategies'][number];

import { useMemo } from 'react';

import {
	useCreateInstrumentsLink,
	useDeleteInstrumentsLink,
	useGetAllInstrumentsLinkSuspense,
} from '@/entities/strategy/api/gen';

function StrategyStockBindingModalContent({ strategyId }: { strategyId: number }) {
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

	const handleLinkedStocksChange = (nextStockIds: string[]) => {
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
		<StrategyStockBinding
			selectedStockIds={serverSelectedStockIds}
			onSelectedStockIdsChange={handleLinkedStocksChange}
		/>
	);
}

const StrategyStockBindingModalBoundary = withQueryBoundary(StrategyStockBindingModalContent);

export function StrategiesList({ limit, onlyActive }: { limit?: number; onlyActive?: boolean } = {}) {
	const {
		strategies,
		filteredStrategies: allFilteredStrategies,
	} = useStrategiesOverview();

	let filteredStrategies = onlyActive
		? allFilteredStrategies.filter((s) => s.isActive)
		: allFilteredStrategies;

	if (limit) {
		filteredStrategies = filteredStrategies.slice(0, limit);
	}

	function openStockBindingModal(strategy: Strategy) {
		modals.open({
			title: `Привязать акции к ${strategy.name}`,
			size: 'xl',
			centered: true,
			children: <StrategyStockBindingModalBoundary strategyId={strategy.id} />,
		});
	}

	if (strategies.length === 0) {
		return <EmptyState title='Стратегий пока нет' description='Нажмите «Создать», чтобы добавить первую стратегию.' />;
	}

	if (filteredStrategies.length === 0) {
		return <EmptyState title='Стратегии не найдены' description='Очистите поиск или измените параметры фильтрации.' />;
	}

	return (
		<Stack gap='md'>
			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{filteredStrategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={toStrategyCardStrategy(strategy, strategy.isActive)}
							actionSlot={
								<StrategyToggleCheckbox strategyId={strategy.id} isActive={strategy.isActive} />
							}
							bottomActionSlot={(
								<Button
									mt='auto'
									type='button'
									variant='default'
									style={{ position: 'relative', zIndex: 2 }}
									onClick={() => openStockBindingModal(strategy)}
								>
									Связать с акцией
								</Button>
							)}
						/>
					</li>
				))}
			</SimpleGrid>
		</Stack>
	);
}

export const StrategiesListBoundary = withQueryBoundary(StrategiesList, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
