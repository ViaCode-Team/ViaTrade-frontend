import { Button, Modal, SimpleGrid, Stack } from '@mantine/core';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

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
} from '@/entities/strategy';
import { StrategyStockBindingList } from '@/features/strategy/bind-stock';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StrategiesListSkeleton } from './strategies-list.skeleton';

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
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('q') || '';
	const [stockBindingStrategyId, setStockBindingStrategyId] = useState<number | null>(null);
	const [selectedStockIdsByStrategyId, setSelectedStockIdsByStrategyId] = useState<
		Record<number, string[]>
	>({});

	const strategies = useMemo(
		() =>
			mapTradeStrategiesToStrategies(
				strategiesQuery.data.data,
				userStrategiesQuery.data.data,
			),
		[strategiesQuery.data.data, userStrategiesQuery.data.data],
	);

	const filteredStrategies = useMemo(
		() =>
			strategies.filter((strategy) =>
				strategy.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
			),
		[strategies, searchQuery],
	);

	const stockBindingStrategy = strategies.find(
		(strategy) => strategy.id === stockBindingStrategyId,
	);
	const stockBindingSelectedIds = stockBindingStrategyId
		? (selectedStockIdsByStrategyId[stockBindingStrategyId] ?? [])
		: [];

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
