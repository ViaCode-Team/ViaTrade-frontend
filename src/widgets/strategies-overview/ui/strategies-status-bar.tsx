import { Skeleton } from '@mantine/core';

import { useUrlFilters } from '@/shared/lib/url-filters';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

import { strategyFiltersSchema } from '../lib/filters';
import { useFilteredStrategies } from '../lib/use-filtered-strategies';
import { getStrategiesRequestParams, useStrategiesData } from '../lib/use-strategies-data';

export function StrategiesStatusBar() {
	const { filters } = useUrlFilters(strategyFiltersSchema);
	const { strategies, totalCount } = useStrategiesData(getStrategiesRequestParams({
		page: Math.max(Number(filters.page) || 1, 1),
		sortOption: filters.listSort,
		statusFilter: filters.statusFilter,
	}));
	const filteredStrategies = useFilteredStrategies(strategies);

	const activeCount = filteredStrategies.filter((s) => s.isActive).length;
	const inactiveCount = filteredStrategies.filter((s) => !s.isActive).length;

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredStrategies.length}
			badges={(
				<>
					<ValueBadge variant='dot' color='green' size='sm' label='Активные' value={activeCount} />
					<ValueBadge variant='dot' color='gray' size='sm' label='Неактивные' value={inactiveCount} />
				</>
			)}
		/>
	);
}

export const StrategiesStatusBarBoundary = withQueryBoundary(StrategiesStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
