import { Skeleton } from '@mantine/core';

import { QUERY_REFETCH_INTERVAL_TEXT } from '@/shared/model';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

import { useFilteredStrategies } from '../lib/use-filtered-strategies';
import { useStrategiesData } from '../lib/use-strategies-data';

export function StrategiesStatusBar() {
	const { strategies, refetch } = useStrategiesData();
	const filteredStrategies = useFilteredStrategies(strategies);

	const activeCount = filteredStrategies.filter((s) => s.isActive).length;
	const inactiveCount = filteredStrategies.filter((s) => !s.isActive).length;

	return (
		<ListStatusBar
			totalCount={strategies.length}
			filteredCount={filteredStrategies.length}
			refreshIntervalText={QUERY_REFETCH_INTERVAL_TEXT}
			onRefresh={refetch}
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
