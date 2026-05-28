import { SimpleGrid } from '@mantine/core';

import { StrategyCardSkeleton } from '@/entities/strategy';
import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { Section } from '@/shared/ui/section';

export function StockStrategiesSectionSkeleton() {
	return (
		<Section
			header={{
				title: 'Привязанные стратегии',
			}}
		>
			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{createSkeletons(3).map((item) => (
					<li key={item.id}>
						<StrategyCardSkeleton />
					</li>
				))}
			</SimpleGrid>
		</Section>
	);
}
