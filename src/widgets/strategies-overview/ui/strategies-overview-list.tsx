import { Button, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';

import type { Strategy } from '@/entities/strategy';

import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { DataState } from '@/shared/ui/data-state';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

import { strategyFiltersSchema } from '../lib/filters';
import { useFilteredStrategies } from '../lib/use-filtered-strategies';
import { getStrategiesRequestParams, STRATEGIES_PAGE_SIZE, useStrategiesData } from '../lib/use-strategies-data';
import { StrategyStockBindingModalBoundary } from './strategy-stock-binding-modal';

function openModal(strategy: Strategy) {
	modals.open({
		title: `Привязать акции к ${strategy.name}`,
		size: 'xl',
		children: <StrategyStockBindingModalBoundary strategyId={strategy.id} />,
	});
}

function StrategiesOverviewList() {
	const { filters, setFilter, resetFilters } = useUrlFilters(strategyFiltersSchema);
	const { strategies, totalPages, totalCount } = useStrategiesData(getStrategiesRequestParams({
		page: Math.max(Number(filters.page) || 1, 1),
		sortOption: filters.listSort,
		statusFilter: filters.statusFilter,
	}));
	const filteredStrategies = useFilteredStrategies(strategies);
	const activeCount = filteredStrategies.filter((strategy) => strategy.isActive).length;
	const inactiveCount = filteredStrategies.length - activeCount;

	return (
		<DataState
			hasData={!!totalCount}
			hasResults={!!filteredStrategies.length}
			onResetFilters={resetFilters}
		>
			<Stack gap='md'>
				<ListStatusBar
					totalCount={totalCount}
					filteredCount={filteredStrategies.length}
					pagination={{
						page: Number(filters.page) || 1,
						pageSize: STRATEGIES_PAGE_SIZE,
						showRange: !filters.q.trim(),
					}}
					badges={(
						<>
							{filters.statusFilter === 'all' && activeCount > 0 && (
								<ValueBadge variant='dot' color='green' size='sm' label='Активные' value={activeCount} />
							)}
							{filters.statusFilter === 'all' && inactiveCount > 0 && (
								<ValueBadge variant='dot' color='gray' size='sm' label='Неактивные' value={inactiveCount} />
							)}
						</>
					)}
				/>

				<StrategiesList
					strategies={filteredStrategies}
					actionSlot={(strategy) => (
						<StrategyToggleCheckbox
							strategyId={strategy.id}
							isActive={strategy.isActive}
						/>
					)}
					bottomActionSlot={(strategy) => (
						<Button
							mt='auto'
							variant='default'
							style={{ position: 'relative', zIndex: 2 }}
							onClick={() => openModal(strategy)}
						>
							Связать с акцией
						</Button>
					)}
					pagination={{
						page: Number(filters.page) || 1,
						totalPages,
						onPageChange: (page) => setFilter('page', String(page)),
					}}
				/>
			</Stack>
		</DataState>
	);
}

export const StrategiesOverviewListBoundary = withQueryBoundary(StrategiesOverviewList, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
