import type { StatusBarPaginationConfig } from '@/shared/ui/list-status-bar';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';

type StrategiesOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination: StatusBarPaginationConfig;
	showSubscriptionBadges: boolean;
	subscribedCount: number;
	unsubscribedCount: number;
};

export function StrategiesOverviewStatusBar({
	totalCount,
	filteredCount,
	pagination,
	showSubscriptionBadges,
	subscribedCount,
	unsubscribedCount,
}: StrategiesOverviewStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={pagination}
			badges={showSubscriptionBadges
				&& (
					<>
						{!!subscribedCount && <ValueBadge variant='dot' color='green' size='sm' label='Подписаны' value={subscribedCount} />}

						{!!unsubscribedCount && <ValueBadge variant='dot' color='gray' size='sm' label='Не подписаны' value={unsubscribedCount} />}
					</>
				)}
		/>
	);
}
