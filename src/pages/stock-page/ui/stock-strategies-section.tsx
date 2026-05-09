import { SimpleGrid } from '@mantine/core';

import type { Stock } from '@/entities/stock';

import {
	StrategyCard,
	toStrategyCardStrategy,
} from '@/entities/strategy';
import { Section } from '@/shared/ui/section';

type StockStrategiesSectionProps = {
	stock: Stock;
	activeStrategyIds: Set<number>;
	pendingStrategyId?: number;
	onStrategyActiveChange: (strategyId: number, isActive: boolean) => void;
};

export function StockStrategiesSection({
	stock,
	activeStrategyIds,
	pendingStrategyId,
	onStrategyActiveChange,
}: StockStrategiesSectionProps) {
	return (
		<Section
			header={{
				title: 'Привязанные стратегии',
				description: `Стратегии, которые привязаны к ${stock.ticker}.`,
			}}
		>
			<SimpleGrid minColWidth={300}>
				{stock.linkedStrategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={toStrategyCardStrategy(
								strategy,
								activeStrategyIds.has(strategy.id),
							)}
							activation={{
								isActiveChangePending: pendingStrategyId === strategy.id,
								onActiveChange: onStrategyActiveChange,
							}}
						/>
					</li>
				))}
			</SimpleGrid>
		</Section>
	);
}
