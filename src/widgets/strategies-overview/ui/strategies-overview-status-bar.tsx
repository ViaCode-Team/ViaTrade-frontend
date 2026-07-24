import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';

type StrategiesOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	page: number;
	pageSize: number;
	showRange: boolean;
	showActivityBadges: boolean;
	activeCount: number;
	inactiveCount: number;
};

export function StrategiesOverviewStatusBar({
	totalCount,
	filteredCount,
	page,
	pageSize,
	showRange,
	showActivityBadges,
	activeCount,
	inactiveCount,
}: StrategiesOverviewStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={{ page, pageSize, showRange }}
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
