import type { ReactNode } from 'react';

import {
	Center,
	Pagination,
	SimpleGrid,
	Stack,
} from '@mantine/core';

import type { PaginationConfig } from '@/shared/model';

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
	pagination?: PaginationConfig;
};

export function StrategiesList({
	strategies,
	actionSlot,
	bottomActionSlot,
	pagination,
}: StrategiesListProps) {
	return (
		<Stack>
			<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING} component='ul'>
				{strategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={mapStrategyToStrategyCard(strategy, strategy.isSubscribed)}
							action={actionSlot?.(strategy)}
							bottomAction={bottomActionSlot?.(strategy)}
						/>
					</li>
				))}
			</SimpleGrid>

			{pagination && (
				<Center>
					<Pagination
						total={pagination.totalPages}
						value={pagination.page}
						onChange={pagination.onPageChange}
					/>
				</Center>
			)}
		</Stack>
	);
}
