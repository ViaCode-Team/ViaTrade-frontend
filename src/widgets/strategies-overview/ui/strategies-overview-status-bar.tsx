import type { StatusBarPaginationConfig } from '@/shared/ui/list-status-bar';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';

type StrategiesOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination: StatusBarPaginationConfig;
	showActivityBadges: boolean;
	activeCount: number;
	inactiveCount: number;
};

export function StrategiesOverviewStatusBar({
	totalCount,
	filteredCount,
	pagination,
	showActivityBadges,
	activeCount,
	inactiveCount,
}: StrategiesOverviewStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={pagination}
			badges={showActivityBadges
				&& (
					<>
						{!!activeCount && <ValueBadge variant='dot' color='green' size='sm' label='Активные' value={activeCount} />}

						{!!inactiveCount && <ValueBadge variant='dot' color='gray' size='sm' label='Неактивные' value={inactiveCount} />}
					</>
				)}
		/>
	);
}
