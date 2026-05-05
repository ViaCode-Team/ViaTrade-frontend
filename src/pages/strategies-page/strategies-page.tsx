import {
	Alert,
	Flex,
	SimpleGrid,
	Skeleton,
	Text,
	Title,
} from '@mantine/core';
import { useMemo } from 'react';

import {
	mapTradeStrategiesToStrategies,
	StrategyCard,
	useGetAll,
	useGetUsersStrategy,
	useToggleUserStrategy,
} from '@/entities/strategy';
import { createSkeletons } from '@/shared/lib/skeleton';
import {
	CONTENT_GRID_SPACING,
} from '@/shared/model/layout';

import cls from './strategies-page.module.css';

export function StrategiesPage() {
	const strategiesQuery = useGetAll();
	const userStrategiesQuery = useGetUsersStrategy();
	const strategyToggle = useToggleUserStrategy();
	const isLoading = strategiesQuery.isLoading || userStrategiesQuery.isLoading;
	const hasError = strategiesQuery.isError || userStrategiesQuery.isError;
	const strategies = useMemo(
		() =>
			mapTradeStrategiesToStrategies(
				strategiesQuery.data?.data ?? [],
				userStrategiesQuery.data?.data ?? [],
			),
		[strategiesQuery.data?.data, userStrategiesQuery.data?.data],
	);

	function handleActiveChange(strategyId: number, isActive: boolean) {
		strategyToggle.mutate({ strategyId, isActive });
	}

	return (
		<>
			<Flex direction='column' gap='xs'>
				<Title order={1}>Стратегии</Title>
				<Text c='dimmed'>
					Подберите стратегию под свой стиль торговли и горизонт инвестирования.
				</Text>
			</Flex>

			{hasError && (
				<Alert color='red' variant='outline'>
					Не удалось загрузить стратегии. Попробуйте обновить страницу.
				</Alert>
			)}

			{strategyToggle.isError && (
				<Alert color='red' variant='outline'>
					Не удалось обновить стратегию. Попробуйте еще раз.
				</Alert>
			)}

			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
				className={cls.grid}
			>
				{isLoading
					? createSkeletons(6).map((item) => (
							<Skeleton key={item.id} component='li' h={300} className={cls.item} />
						))
					: strategies.map((strategy) => (
							<li key={strategy.id} className={cls.item}>
								<StrategyCard
									strategy={strategy}
									isActiveChangePending={
										strategyToggle.isPending
										&& strategyToggle.variables?.strategyId === strategy.id
									}
									onActiveChange={handleActiveChange}
								/>
							</li>
						))}
			</SimpleGrid>

			{!isLoading && !hasError && strategies.length === 0 && (
				<Text size='sm' c='dimmed'>
					Стратегии пока не доступны.
				</Text>
			)}
		</>
	);
}
