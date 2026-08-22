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
		subscribedCount,
		unsubscribedCount,
		totalPages,
		totalCount,
		setPage,
		resetFilters,
	} = useStrategiesOverview();

	return (
		<DataState
			hasData={!!totalCount || Boolean(filters.q.trim()) || filters.statusFilter !== 'all'}
			hasResults={!!filteredStrategies.length}
			onResetFilters={resetFilters}
		>
			<Stack>
				<StrategiesOverviewStatusBar
					totalCount={totalCount}
					filteredCount={filteredStrategies.length}
					pagination={{
						page,
						pageSize: STRATEGIES_PAGE_SIZE,
						totalPages,
						onPageChange: setPage,
						showRange: filters.statusFilter === 'all',
					}}
					showSubscriptionBadges={filters.statusFilter === 'all'}
					subscribedCount={subscribedCount}
					unsubscribedCount={unsubscribedCount}
				/>

				<StrategiesList
					strategies={filteredStrategies}
					actionSlot={(strategy) => (
						<StrategyToggleCheckbox
							strategyId={strategy.id}
							isSubscribed={strategy.isSubscribed}
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
