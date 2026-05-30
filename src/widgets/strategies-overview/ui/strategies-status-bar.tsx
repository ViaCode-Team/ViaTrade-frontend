import { Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

import { useStrategiesOverview } from '../lib/use-strategies-overview';

export function StrategiesStatusBar() {
	const {
		strategies,
		filteredStrategies,
	} = useStrategiesOverview();

	const activeCount = filteredStrategies.filter((s) => s.isActive).length;
	const inactiveCount = filteredStrategies.filter((s) => !s.isActive).length;

	return (
		<ListStatusBar
			totalCount={strategies.length}
			filteredCount={filteredStrategies.length}
			refreshIntervalText='Автообновление: 1 мин'
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
		fallback: <Skeleton height={40} radius='md' />,
	},
});
