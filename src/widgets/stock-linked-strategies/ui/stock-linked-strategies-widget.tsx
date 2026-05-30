import { Group, Pagination, SimpleGrid, Stack } from '@mantine/core';
import { useMemo } from 'react';

import {
	getUserStrategyIdSet,
	mapTradeStrategiesToStrategies,
	StrategyCard,
	useGetAllSuspense,
	useGetUsersStrategySuspense,
} from '@/entities/strategy';
import { useGetAllInstrumentsLinkSuspense } from '@/entities/strategy/api/gen';
import {
	filterLinkedStrategies,
	LinkedStrategiesControls,
	LinkedStrategiesStatusBar,
	useLinkedStrategiesControls,
} from '@/features/strategy/filter-linked-strategies';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StockLinkedStrategiesWidgetSkeleton } from './stock-linked-strategies-widget.skeleton';

const PAGE_SIZE = 12;

type StockLinkedStrategiesWidgetProps = {
	stockId: number;
	onNavigate?: () => void;
};

export function StockLinkedStrategiesWidget({ stockId, onNavigate }: StockLinkedStrategiesWidgetProps) {
	const { data: userStrategies } = useGetUsersStrategySuspense();
	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategies.data),
		[userStrategies.data],
	);

	const { data: instrumentsLinkResponse } = useGetAllInstrumentsLinkSuspense();
	const { data: strategiesResponse } = useGetAllSuspense();

	// All linked strategies for this stock
	const allLinkedStrategies = useMemo(() => {
		const linkedStrategyIds = new Set(
			instrumentsLinkResponse.data
				.filter((link) => link.tradeCodeId === stockId)
				.map((link) => link.strategyId),
		);

		const tradeStrategies = strategiesResponse.data.filter((strategy) => linkedStrategyIds.has(strategy.id));
		return mapTradeStrategiesToStrategies(tradeStrategies, userStrategies.data);
	}, [instrumentsLinkResponse.data, strategiesResponse.data, userStrategies.data, stockId]);

	const { filters, setFilter, page, setPage } = useLinkedStrategiesControls();

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
		return <EmptyState title='Нет стратегий' description='К этой акции пока не привязано ни одной стратегии.' />;
	}

	return (
		<Stack gap='md'>
			<Stack gap='xs'>
				<LinkedStrategiesControls filters={filters} setFilter={setFilter} />

				<LinkedStrategiesStatusBar
					totalCount={allLinkedStrategies.length}
					filteredCount={filteredStrategies.length}
				/>
			</Stack>

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

export const StockLinkedStrategiesWidgetBoundary = withQueryBoundary(StockLinkedStrategiesWidget, {
	suspenseProps: {
		fallback: <StockLinkedStrategiesWidgetSkeleton />,
	},
});
