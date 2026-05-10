import { SimpleGrid } from '@mantine/core';
import { useMemo } from 'react';

import type { Stock } from '@/entities/stock';

import {
	getUserStrategyIdSet,
	StrategyCard,
	toStrategyCardStrategy,
	useGetUsersStrategySuspense,
	useToggleUserStrategy,
} from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { StockStrategiesSectionSkeleton } from './stock-strategies-section.skeleton';

type StockStrategiesSectionProps = {
	stock: Stock;
};

export function StockStrategiesSection({
	stock,
}: StockStrategiesSectionProps) {
	const { data: userStrategies } = useGetUsersStrategySuspense();
	const strategyToggle = useToggleUserStrategy();
	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategies.data),
		[userStrategies.data],
	);
	const pendingStrategyId = strategyToggle.isPending
		? strategyToggle.variables?.strategyId
		: undefined;

	function handleStrategyActiveChange(strategyId: number, isActive: boolean) {
		strategyToggle.mutate({ strategyId, isActive });
	}

	return (
		<Section
			header={{
				title: 'Привязанные стратегии',
				description: `Стратегии, которые привязаны к ${stock.ticker}.`,
			}}
		>
			<SimpleGrid minColWidth={300} component='ul' m={0} p={0}>
				{stock.linkedStrategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={toStrategyCardStrategy(
								strategy,
								activeStrategyIds.has(strategy.id),
							)}
							activation={{
								isActiveChangePending: pendingStrategyId === strategy.id,
								onActiveChange: handleStrategyActiveChange,
							}}
						/>
					</li>
				))}
			</SimpleGrid>
		</Section>
	);
}

export const StockStrategiesSectionBoundary = withQueryBoundary(StockStrategiesSection, {
	suspenseProps: {
		fallback: <StockStrategiesSectionSkeleton />,
	},
});
