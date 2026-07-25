import { Grid } from '@mantine/core';

import {
	mapTradeStrategyToStrategy,
	useGetStrategyByIdSuspense,
	useToggleUserStrategy,
} from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StrategyHeroSkeleton } from './strategy-hero.skeleton';
import { StrategyMetaPanel } from './strategy-meta-panel';
import { StrategyTitleBlock } from './strategy-title-block';

type StrategyHeroProps = {
	strategyId: number;
};

function StrategyHero({ strategyId }: StrategyHeroProps) {
	const strategyQuery = useGetStrategyByIdSuspense(strategyId);
	const strategyToggle = useToggleUserStrategy();
	const activeStrategyIds = new Set(strategyQuery.data.data.isActive ? [strategyId] : []);
	const strategy = mapTradeStrategyToStrategy(strategyQuery.data.data, activeStrategyIds);

	if (!strategy) {
		return null;
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
		</>
	);
}

export const StrategyHeroBoundary = withQueryBoundary(StrategyHero, {
	suspenseProps: { fallback: <StrategyHeroSkeleton /> },
});
