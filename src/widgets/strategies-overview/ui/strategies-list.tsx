import { Button, Modal, SimpleGrid, Stack } from '@mantine/core';

import { mockStocks } from '@/entities/stock';
import {
	StrategyCard,
	toStrategyCardStrategy,
} from '@/entities/strategy';
import { StrategyStockBindingList } from '@/features/strategy/bind-stock';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStrategiesOverview } from '../lib/use-strategies-overview';
import { StrategiesListSkeleton } from './strategies-list.skeleton';

export function StrategiesList() {
	const {
		strategies,
		filteredStrategies,
		stockBindingStrategy,
		stockBindingSelectedIds,
		setStockBindingStrategyId,
		handleStockBindingChange,
	} = useStrategiesOverview();

	return (
		<>
			<Modal
				opened={stockBindingStrategy !== undefined}
				onClose={() => setStockBindingStrategyId(null)}
				title={
					stockBindingStrategy
						? `Привязать акции к ${stockBindingStrategy.name}`
						: 'Привязать акции'
				}
				size='xl'
				centered
			>
				{stockBindingStrategy && (
					<StrategyStockBindingList
						stocks={mockStocks}
						selectedStockIds={stockBindingSelectedIds}
						onSelectedStockIdsChange={handleStockBindingChange}
						title='Выберите акции'
						emptyText='Акции не найдены'
					/>
				)}
			</Modal>

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
										onClick={() => setStockBindingStrategyId(strategy.id)}
									>
										Связать с акцией
									</Button>
								)}
							/>
						</li>
					))}
				</SimpleGrid>

				{filteredStrategies.length === 0 && (
					<EmptyState
						title={
							strategies.length === 0
								? 'Стратегии пока не доступны'
								: 'По вашему запросу ничего не найдено'
						}
					/>
				)}
			</Stack>
		</>
	);
}

export const StrategiesListBoundary = withQueryBoundary(StrategiesList, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
