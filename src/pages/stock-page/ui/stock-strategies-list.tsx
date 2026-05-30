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
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StockStrategiesListSkeleton } from './stock-strategies-list.skeleton';

export function StockStrategiesList({ stock }: { stock: Stock }) {
	const { data: userStrategies } = useGetUsersStrategySuspense();
	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategies.data),
		[userStrategies.data],
	);

	if (stock.linkedStrategies.length === 0) {
		return <EmptyState title='Нет стратегий' description='Привяжите стратегию, чтобы отслеживать по ней сигналы.' />;
	}

	return (
		<SimpleGrid minColWidth={300} component='ul'>
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
	);
}

export const StockStrategiesListBoundary = withQueryBoundary(StockStrategiesList, {
	suspenseProps: {
		fallback: <StockStrategiesListSkeleton />,
	},
});
