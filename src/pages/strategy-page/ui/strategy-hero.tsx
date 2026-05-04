import { Grid } from '@mantine/core';

import type { Strategy } from '@/entities/strategy';

import { StrategyMetaPanel } from './strategy-meta-panel';
import { StrategyTitleBlock } from './strategy-title-block';

type StrategyHeroProps = {
	strategy: Strategy;
	onActiveChange: (isActive: boolean) => void;
};


export function StrategyHero({ strategy, onActiveChange }: StrategyHeroProps) {
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
				<StrategyTitleBlock strategy={strategy} onActiveChange={onActiveChange} />
			</Grid.Col>

			<Grid.Col span={{ base: 12, md: 6 }}>
				<StrategyMetaPanel strategy={strategy} />
			</Grid.Col>
		</Grid>
	);
}
