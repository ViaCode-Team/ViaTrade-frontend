import {
	Card,
	SimpleGrid,
	Skeleton,
	Stack,
} from '@mantine/core';

const STRATEGY_INFO_CARD_SKELETONS = 3;

export function StrategyInfoGridSkeleton() {
	return (
		<section>
			<SimpleGrid minColWidth={300} autoFlow='auto-fit'>
				{Array.from({ length: STRATEGY_INFO_CARD_SKELETONS }, (_, index) => (
					<Card key={index}>
						<Stack gap='sm'>
							<Skeleton h={28} w='60%' radius='sm' />
							<Skeleton h={44} radius='sm' />
						</Stack>
					</Card>
				))}
			</SimpleGrid>
		</section>
	);
}
