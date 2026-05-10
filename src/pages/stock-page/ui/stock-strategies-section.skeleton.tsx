import {
	SimpleGrid,
	Skeleton,
} from '@mantine/core';

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
				m={0}
				p={0}
			>
				{createSkeletons(3).map((item) => (
					<Skeleton key={item.id} component='li' h={260} />
				))}
			</SimpleGrid>
		</Section>
	);
}
