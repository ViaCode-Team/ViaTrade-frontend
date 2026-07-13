import type { ReactNode } from 'react';

import { SimpleGrid } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model';

import {
	mapStrategyToStrategyCard,
	type Strategy,
} from '../../model';
import { StrategyCard } from '../strategy-card';

export type StrategiesListProps = {
	strategies: Strategy[];
	actionSlot?: (strategy: Strategy) => ReactNode;
	bottomActionSlot?: (strategy: Strategy) => ReactNode;
};

export function StrategiesList({ strategies, actionSlot, bottomActionSlot }: StrategiesListProps) {
	return (
		<SimpleGrid
			minColWidth={300}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
		>
			{strategies.map((strategy) => (
				<li key={strategy.id}>
					<StrategyCard
						strategy={mapStrategyToStrategyCard(strategy, strategy.isActive)}
						action={actionSlot?.(strategy)}
						bottomAction={bottomActionSlot?.(strategy)}
					/>
				</li>
			))}
		</SimpleGrid>
	);
}
