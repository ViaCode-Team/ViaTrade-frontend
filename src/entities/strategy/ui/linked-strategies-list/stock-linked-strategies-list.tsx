import { Group, Pagination, SimpleGrid, Stack } from '@mantine/core';
import { useMemo } from 'react';

import { StrategyCard, type StrategyCardStrategy } from '@/entities/strategy';
import { EmptyState } from '@/shared/ui/empty-state';

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
			<EmptyState title='Нет стратегий' description='К этой акции пока не привязано ни одной стратегии.' />
		);
	}

	return (
		<Stack gap='md'>
			{strategies.length === 0
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
						</>
					)}
		</Stack>
	);
}
