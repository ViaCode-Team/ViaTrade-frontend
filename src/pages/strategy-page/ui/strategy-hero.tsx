import { Alert, Grid } from '@mantine/core';
import { useMemo } from 'react';

import {
	getUserStrategyIdSet,
	mapTradeStrategyToStrategy,
	useGetById,
	useGetUsersStrategy,
	useToggleUserStrategy,
} from '@/entities/strategy';

import { StrategyHeroSkeleton } from './strategy-hero.skeleton';
import { StrategyMetaPanel } from './strategy-meta-panel';
import { StrategyTitleBlock } from './strategy-title-block';

type StrategyHeroProps = {
	strategyId: number;
};

export function StrategyHero({ strategyId }: StrategyHeroProps) {
	const strategyQuery = useGetById(strategyId);
	const userStrategiesQuery = useGetUsersStrategy();
	const strategyToggle = useToggleUserStrategy();
	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategiesQuery.data?.data ?? []),
		[userStrategiesQuery.data?.data],
	);
	const strategy = strategyQuery.data?.data
		? mapTradeStrategyToStrategy(strategyQuery.data.data, activeStrategyIds)
		: null;
	const isLoading = strategyQuery.isLoading || userStrategiesQuery.isLoading;
	const hasError = strategyQuery.isError || userStrategiesQuery.isError;

	if (isLoading) {
		return <StrategyHeroSkeleton />;
	}

	if (hasError) {
		return (
			<Alert color='red' variant='outline'>
				Не удалось загрузить стратегию. Попробуйте обновить страницу.
			</Alert>
		);
	}

	if (!strategy) {
		return (
			<Alert color='red' variant='outline'>
				Стратегия не найдена.
			</Alert>
		);
	}

	const handleActiveChange = (nextIsActive: boolean) => {
		strategyToggle.mutate({
			strategyId: strategy.id,
			isActive: nextIsActive,
		});
	};

	return (
		<>
			<Grid
				gap='lg'
				type='container'
				breakpoints={{
					xs: '36em',
					sm: '48em',
					md: '62em',
					lg: '75em',
					xl: '88em',
				}}
			>
				<Grid.Col span={{ base: 12, md: 6 }}>
					<StrategyTitleBlock
						strategy={strategy}
						isActiveChangePending={
							strategyToggle.isPending
							&& strategyToggle.variables?.strategyId === strategy.id
						}
						onActiveChange={handleActiveChange}
					/>
				</Grid.Col>

				<Grid.Col span={{ base: 12, md: 6 }}>
					<StrategyMetaPanel strategy={strategy} />
				</Grid.Col>
			</Grid>

			{strategyToggle.isError && (
				<Alert color='red' variant='outline'>
					Не удалось обновить стратегию. Попробуйте еще раз.
				</Alert>
			)}
		</>
	);
}
