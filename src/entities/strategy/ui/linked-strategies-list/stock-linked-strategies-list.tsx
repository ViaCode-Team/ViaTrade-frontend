import type { ReactNode } from 'react';

import { Center, Pagination, SimpleGrid, Stack } from '@mantine/core';

import type { PaginationConfig } from '@/shared/model';

import type { StrategyCardStrategy } from '../../model';

import { StrategyCard } from '../strategy-card';

export { StockLinkedStrategiesListSkeleton } from './stock-linked-strategies-list.skeleton';

export type StockLinkedStrategiesListProps = {
	strategies: StrategyCardStrategy[];
	activeStrategyIds: Set<number>;
	pagination?: PaginationConfig;
	onNavigate?: () => void;
	renderAction?: (strategy: StrategyCardStrategy, isActive: boolean) => ReactNode;
};

export function StockLinkedStrategiesList({
	strategies,
	activeStrategyIds,
	pagination,
	onNavigate,
	renderAction,
}: StockLinkedStrategiesListProps) {
	return (
		<Stack>
			<SimpleGrid minColWidth={300} component='ul'>
				{strategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={strategy}
							onLinkClick={onNavigate}
							action={renderAction?.(strategy, activeStrategyIds.has(strategy.id))}
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
