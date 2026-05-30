import { Button, SimpleGrid, Stack, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from 'react';

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

function StrategyStockBindingModalWrapper({
	initialSelectedStockIds,
	onSave,
}: {
	initialSelectedStockIds: string[];
	onSave: (nextStockIds: string[]) => void;
}) {
	const [selectedStockIds, setSelectedStockIds] = useState(initialSelectedStockIds);

	return (
		<Stack gap='md'>
			<StrategyStockBinding
				selectedStockIds={selectedStockIds}
				onSelectedStockIdsChange={setSelectedStockIds}
				emptyText='Акции не найдены'
			/>
			<Stack mt='md' align='flex-end'>
				<Button
					onClick={() => {
						onSave(selectedStockIds);
						modals.closeAll();
					}}
				>
					Сохранить
				</Button>
			</Stack>
		</Stack>
	);
}

export function StrategiesList({ limit, onlyActive }: { limit?: number; onlyActive?: boolean } = {}) {
	const {
		strategies,
		filteredStrategies: allFilteredStrategies,
		getStockBindingSelectedIds,
		handleStockBindingChange,
	} = useStrategiesOverview();

	let filteredStrategies = onlyActive
		? allFilteredStrategies.filter((s) => s.isActive)
		: allFilteredStrategies;

	if (limit) {
		filteredStrategies = filteredStrategies.slice(0, limit);
	}

	function openStockBindingModal(strategy: Strategy) {
		const initialIds = getStockBindingSelectedIds(strategy.id);

		modals.open({
			title: (
				<Title order={2}>
					Привязать акции к
					{' '}
					{strategy.name}
				</Title>
			),
			size: 'xl',
			centered: true,
			children: (
				<StrategyStockBindingModalWrapper
					initialSelectedStockIds={initialIds}
					onSave={(nextStockIds) => {
						handleStockBindingChange(strategy.id, nextStockIds);
					}}
				/>
			),
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
