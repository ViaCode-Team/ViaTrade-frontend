import { Stack } from '@mantine/core';

import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { STRATEGIES_PAGE_SIZE } from '../lib/use-strategies-data';
import { useStrategiesOverview } from '../lib/use-strategies-overview';
import { StrategiesOverviewStatusBar } from './strategies-overview-status-bar';
import { StrategyStockBindingButton } from './strategy-stock-binding-button';

function StrategiesOverviewList() {
	const {
		filters,
		page,
		filteredStrategies,
		activeCount,
		inactiveCount,
		totalPages,
		totalCount,
		setPage,
		resetFilters,
	} = useStrategiesOverview();

	return (
		<DataState
			hasData={!!totalCount}
			hasResults={!!filteredStrategies.length}
			onResetFilters={resetFilters}
		>
			<Stack>
				<StrategiesOverviewStatusBar
					totalCount={totalCount}
					filteredCount={filteredStrategies.length}
					page={page}
					pageSize={STRATEGIES_PAGE_SIZE}
					showRange={!filters.q.trim()}
					showActivityBadges={filters.statusFilter === 'all'}
					activeCount={activeCount}
					inactiveCount={inactiveCount}
				/>

				<StrategiesList
					strategies={filteredStrategies}
					actionSlot={(strategy) => (
						<StrategyToggleCheckbox
							strategyId={strategy.id}
							isActive={strategy.isActive}
						/>
					)}
					bottomActionSlot={(strategy) => <StrategyStockBindingButton strategy={strategy} />}
					pagination={{
						page,
						totalPages,
						onPageChange: setPage,
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
