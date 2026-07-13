import { Group, Pagination, SimpleGrid, Stack } from '@mantine/core';
import { type ReactNode, useMemo } from 'react';

import type { StrategyCardStrategy } from '../../model';

import { StrategyCard } from '../strategy-card';

export { StockLinkedStrategiesListSkeleton } from './stock-linked-strategies-list.skeleton';

const PAGE_SIZE = 12;

export type StockLinkedStrategiesListProps = {
	strategies: StrategyCardStrategy[];
	activeStrategyIds: Set<number>;
	page: number;
	setPage: (page: number) => void;
	onNavigate?: () => void;
	renderAction?: (strategy: StrategyCardStrategy, isActive: boolean) => ReactNode;
};

export function StockLinkedStrategiesList({
	strategies,
	activeStrategyIds,
	page,
	setPage,
	onNavigate,
	renderAction,
}: StockLinkedStrategiesListProps) {
	const totalPages = Math.ceil(strategies.length / PAGE_SIZE);
	const paginatedStrategies = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return strategies.slice(start, start + PAGE_SIZE);
	}, [strategies, page]);

	return (
		<Stack>
			<SimpleGrid minColWidth={300} component='ul'>
				{paginatedStrategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={strategy}
							onLinkClick={onNavigate}
							action={renderAction?.(strategy, activeStrategyIds.has(strategy.id))}
						/>
					</li>
				))}
			</SimpleGrid>

			{totalPages > 1 && (
				<Group justify='center' mt='sm'>
					<Pagination
						total={totalPages}
						value={page}
						onChange={setPage}
						size='sm'
					/>
				</Group>
			)}
		</Stack>
	);
}
