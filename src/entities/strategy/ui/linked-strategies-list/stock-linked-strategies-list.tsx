import { Group, Pagination, SimpleGrid, Stack } from '@mantine/core';
import { useMemo } from 'react';

import { AppEmptyState } from '@/shared/ui/app-empty-state';

import type { StrategyCardStrategy } from '../../model';

import { StrategyCard } from '../strategy-card';

export { StockLinkedStrategiesListSkeleton } from './stock-linked-strategies-list.skeleton';

const PAGE_SIZE = 12;

export type StockLinkedStrategiesListProps = {
	strategies: StrategyCardStrategy[];
	activeStrategyIds: Set<number>;
	hasAnyStrategies: boolean;
	page: number;
	setPage: (page: number) => void;
	onNavigate?: () => void;
	actionSlot?: (strategy: StrategyCardStrategy, isActive: boolean) => React.ReactNode;
};

export function StockLinkedStrategiesList({
	strategies,
	activeStrategyIds,
	hasAnyStrategies,
	page,
	setPage,
	onNavigate,
	actionSlot,
}: StockLinkedStrategiesListProps) {
	const totalPages = Math.ceil(strategies.length / PAGE_SIZE);
	const paginatedStrategies = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return strategies.slice(start, start + PAGE_SIZE);
	}, [strategies, page]);

	if (!hasAnyStrategies) {
		return (
			<AppEmptyState
				title='Стратегий пока нет'
				description='К этой акции пока не привязано ни одной стратегии.'
			/>
		);
	}

	if (strategies.length === 0) {
		return (
			<AppEmptyState
				title='Стратегии не найдены'
				description='Попробуйте изменить поисковый запрос или фильтры.'
			/>
		);
	}

	return (
		<Stack>
			<SimpleGrid minColWidth={300} component='ul'>
				{paginatedStrategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={strategy}
							onLinkClick={onNavigate}
							actionSlot={actionSlot?.(strategy, activeStrategyIds.has(strategy.id))}
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
