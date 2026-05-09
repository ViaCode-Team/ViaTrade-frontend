import { SimpleGrid } from '@mantine/core';

import type { Stock } from '@/entities/stock';

import { Section } from '@/shared/ui/section';
import { StockLinkedStrategyCard } from '@/widgets/stock-linked-strategies';

type StockStrategiesSectionProps = {
	stock: Stock;
};

export function StockStrategiesSection({ stock }: StockStrategiesSectionProps) {
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
						<StockLinkedStrategyCard strategy={strategy} />
					</li>
				))}
			</SimpleGrid>
		</Section>
	);
}
