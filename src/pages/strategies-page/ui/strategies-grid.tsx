import { SimpleGrid, Text } from '@mantine/core';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
	type GetAllSuspenseQueryError,
	type GetAllSuspenseQueryResult,
	getGetAllSuspenseQueryOptions,
	getGetUsersStrategySuspenseQueryOptions,
	type GetUsersStrategySuspenseQueryError,
	type GetUsersStrategySuspenseQueryResult,
	mapTradeStrategiesToStrategies,
	StrategyCard,
	useToggleUserStrategy,
} from '@/entities/strategy';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

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

export function StrategiesGrid() {
	const [strategiesQuery, userStrategiesQuery]
		= useSuspenseQueries<StrategiesQueries>({
			queries: [
				getGetAllSuspenseQueryOptions(),
				getGetUsersStrategySuspenseQueryOptions(),
			],
		});
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

	function handleActiveChange(strategyId: number, isActive: boolean) {
		strategyToggle.mutate({ strategyId, isActive });
	}

	return (
		<>
			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{strategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={strategy}
							isActiveChangePending={pendingStrategyId === strategy.id}
							onActiveChange={handleActiveChange}
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
