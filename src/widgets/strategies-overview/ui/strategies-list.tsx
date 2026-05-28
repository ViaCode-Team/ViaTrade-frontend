import { Badge, Button, SimpleGrid, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from 'react';

import {
	StrategyCard,
	toStrategyCardStrategy,
} from '@/entities/strategy';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock } from '@/entities/trade-code/stock';
import { StrategyStockBindingList } from '@/features/strategy/bind-stock';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStrategiesOverview } from '../lib/use-strategies-overview';
import { StrategiesListSkeleton } from './strategies-list.skeleton';

type Strategy = ReturnType<typeof useStrategiesOverview>['strategies'][number];
type Stock = ReturnType<typeof mapTradeCodeToStock>;

function StrategyStockBindingModalWrapper({
	stocks,
	initialSelectedStockIds,
	onSave,
}: {
	stocks: Stock[];
	initialSelectedStockIds: string[];
	onSave: (nextStockIds: string[]) => void;
}) {
	const [selectedStockIds, setSelectedStockIds] = useState(initialSelectedStockIds);

	return (
		<Stack gap='md'>
			<StrategyStockBindingList
				stocks={stocks}
				selectedStockIds={selectedStockIds}
				onSelectedStockIdsChange={setSelectedStockIds}
				title='Выберите акции'
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

export function StrategiesList() {
	const {
		strategies,
		filteredStrategies,
		getStockBindingSelectedIds,
		handleStockBindingChange,
	} = useStrategiesOverview();

	const { data: stocksResponse } = useGetAllStocksCodesSuspense();
	const stocks = stocksResponse.data.map(mapTradeCodeToStock);

	function openStockBindingModal(strategy: Strategy) {
		const initialIds = getStockBindingSelectedIds(strategy.id);

		modals.open({
			title: `Привязать акции к ${strategy.name}`,
			size: 'xl',
			centered: true,
			children: (
				<StrategyStockBindingModalWrapper
					stocks={stocks}
					initialSelectedStockIds={initialIds}
					onSave={(nextStockIds) => {
						handleStockBindingChange(strategy.id, nextStockIds);
					}}
				/>
			),
		});
	}

	const activeCount = filteredStrategies.filter((s) => s.isActive).length;
	const inactiveCount = filteredStrategies.filter((s) => !s.isActive).length;

	return (
		<Stack gap='md'>
			<ListStatusBar
				totalCount={strategies.length}
				filteredCount={filteredStrategies.length}
				refreshIntervalText='Автообновление: 1 мин'
				badges={(
					<>
						<Badge variant='dot' color='green' size='sm'>
							Активные:
							{activeCount}
						</Badge>
						<Badge variant='dot' color='gray' size='sm'>
							Неактивные:
							{inactiveCount}
						</Badge>
					</>
				)}
			/>

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
	);
}

export const StrategiesListBoundary = withQueryBoundary(StrategiesList, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
