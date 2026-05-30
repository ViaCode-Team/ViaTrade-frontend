import { Group, Pagination, SimpleGrid, Stack } from '@mantine/core';
import { useMemo } from 'react';

import { StrategyCard } from '@/entities/strategy';
import {
	filterLinkedStrategies,
	type LinkedStrategyFilters,
} from '@/features/strategy/filter-linked-strategies';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStockLinkedStrategies } from '../model/use-stock-linked-strategies';
import { StockLinkedStrategiesListSkeleton } from './stock-linked-strategies-list.skeleton';

const PAGE_SIZE = 12;

type StockLinkedStrategiesListProps = {
	stockId: number;
	filters: LinkedStrategyFilters;
	page: number;
	setPage: (page: number) => void;
	onNavigate?: () => void;
};

export function StockLinkedStrategiesList({
	stockId,
	filters,
	page,
	setPage,
	onNavigate,
}: StockLinkedStrategiesListProps) {
	const { allLinkedStrategies, activeStrategyIds } = useStockLinkedStrategies(stockId);

	// Filtered strategies
	const filteredStrategies = useMemo(
		() => filterLinkedStrategies(allLinkedStrategies, filters),
		[allLinkedStrategies, filters],
	);

	// Pagination
	const totalPages = Math.ceil(filteredStrategies.length / PAGE_SIZE);
	const paginatedStrategies = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE;
		return filteredStrategies.slice(start, start + PAGE_SIZE);
	}, [filteredStrategies, page]);

	if (allLinkedStrategies.length === 0) {
		return (
			<EmptyState title='Нет стратегий' description='К этой акции пока не привязано ни одной стратегии.' />
		);
	}

	return (
		<Stack gap='md'>
			{filteredStrategies.length === 0
				? (
						<EmptyState title='Ничего не найдено' description='Попробуйте изменить поисковый запрос или фильтры.' />
					)
				: (
						<>
							<SimpleGrid minColWidth={300} component='ul'>
								{paginatedStrategies.map((strategy) => (
									<li key={strategy.id}>
										<StrategyCard
											strategy={strategy}
											onLinkClick={onNavigate}
											actionSlot={(
												<StrategyToggleCheckbox
													strategyId={strategy.id}
													isActive={activeStrategyIds.has(strategy.id)}
												/>
											)}
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
						</>
					)}
		</Stack>
	);
}

export const StockLinkedStrategiesListBoundary = withQueryBoundary(StockLinkedStrategiesList, {
	suspenseProps: {
		fallback: <StockLinkedStrategiesListSkeleton />,
	},
});
