import { SimpleGrid } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';

import { StrategyInfoCardSkeleton } from './strategy-info-card.skeleton';

const STRATEGY_INFO_CARD_SKELETONS = 3;

const skeletons = createSkeletons(STRATEGY_INFO_CARD_SKELETONS);

export function StrategyInfoListSkeleton() {
	return (
		<section>
			<SimpleGrid minColWidth={300} autoFlow='auto-fit'>
				{skeletons.map((skeleton) => (
					<StrategyInfoCardSkeleton key={skeleton.id} />
				))}
			</SimpleGrid>
		</section>
	);
}
