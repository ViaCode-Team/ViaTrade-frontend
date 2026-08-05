import { Grid } from '@mantine/core';

import type { Strategy } from '@/entities/strategy';

import {
	useToggleUserStrategy,
} from '@/entities/strategy';

import { StrategyMetaPanel } from './strategy-meta-panel';
import { StrategyTitleBlock } from './strategy-title-block';

type StrategyHeroProps = {
	strategy: Strategy;
};

export function StrategyHero({ strategy }: StrategyHeroProps) {
	const strategyToggle = useToggleUserStrategy();

	const handleActiveChange = (nextIsActive: boolean) => {
		strategyToggle.mutate({
			strategyId: strategy.id,
			isActive: nextIsActive,
		});
	};

	return (
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
	);
}
