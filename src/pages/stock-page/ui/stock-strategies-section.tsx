import { SimpleGrid } from '@mantine/core';
import { useMemo } from 'react';

import type { Stock } from '@/entities/trade-code/stock';

import {
	getUserStrategyIdSet,
	StrategyCard,
	toStrategyCardStrategy,
	useGetUsersStrategySuspense,
} from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
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
	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategies.data),
		[userStrategies.data],
	);

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
							actionSlot={
								<StrategyToggleCheckbox strategyId={strategy.id} isActive={activeStrategyIds.has(strategy.id)} />
							}
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
