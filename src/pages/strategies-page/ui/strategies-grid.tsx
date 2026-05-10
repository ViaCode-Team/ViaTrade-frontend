import { Modal, SimpleGrid, Text } from '@mantine/core';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { mockStocks } from '@/entities/stock';
import {
	type GetAllSuspenseQueryError,
	type GetAllSuspenseQueryResult,
	getGetAllSuspenseQueryOptions,
	getGetUsersStrategySuspenseQueryOptions,
	type GetUsersStrategySuspenseQueryError,
	type GetUsersStrategySuspenseQueryResult,
	mapTradeStrategiesToStrategies,
	StrategyCard,
	toStrategyCardStrategy,
	useToggleUserStrategy,
} from '@/entities/strategy';
import { StrategyStockBindingList } from '@/features/strategy-stock-binding';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StrategiesListSkeleton } from './strategies-grid.skeleton';

type StrategiesQueries = [
	{
		queryFnData: GetAllSuspenseQueryResult;
		error: GetAllSuspenseQueryError;
	},
	{
		queryFnData: GetUsersStrategySuspenseQueryResult;
		error: GetUsersStrategySuspenseQueryError;
	},
];

export function StrategiesList() {
	const [strategiesQuery, userStrategiesQuery]
		= useSuspenseQueries<StrategiesQueries>({
			queries: [
				getGetAllSuspenseQueryOptions(),
				getGetUsersStrategySuspenseQueryOptions(),
			],
		});
	const [stockBindingStrategyId, setStockBindingStrategyId] = useState<number | null>(null);
	const [selectedStockIdsByStrategyId, setSelectedStockIdsByStrategyId] = useState<
		Record<number, string[]>
	>({});
	const strategyToggle = useToggleUserStrategy();
	const strategies = useMemo(
		() =>
			mapTradeStrategiesToStrategies(
				strategiesQuery.data.data,
				userStrategiesQuery.data.data,
			),
		[strategiesQuery.data.data, userStrategiesQuery.data.data],
	);

	const pendingStrategyId = strategyToggle.isPending
		? strategyToggle.variables?.strategyId
		: undefined;
	const stockBindingStrategy = strategies.find(
		(strategy) => strategy.id === stockBindingStrategyId,
	);
	const stockBindingSelectedIds = stockBindingStrategyId
		? (selectedStockIdsByStrategyId[stockBindingStrategyId] ?? [])
		: [];

	function handleActiveChange(strategyId: number, isActive: boolean) {
		strategyToggle.mutate({ strategyId, isActive });
	}

	function handleStockBindingChange(nextStockIds: string[]) {
		if (!stockBindingStrategyId) {
			return;
		}

		setSelectedStockIdsByStrategyId((currentSelectedStockIds) => ({
			...currentSelectedStockIds,
			[stockBindingStrategyId]: nextStockIds,
		}));
	}

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

			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{strategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={toStrategyCardStrategy(strategy, strategy.isActive)}
							activation={{
								isActiveChangePending: pendingStrategyId === strategy.id,
								onActiveChange: handleActiveChange,
							}}
							stockBinding={{
								onStockBindClick: setStockBindingStrategyId,
							}}
						/>
					</li>
				))}
			</SimpleGrid>

			{strategies.length === 0 && (
				<Text size='sm' c='dimmed'>
					Стратегии пока не доступны.
				</Text>
			)}
		</>
	);
}

export const StrategiesListBoundary = withQueryBoundary(StrategiesList, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
