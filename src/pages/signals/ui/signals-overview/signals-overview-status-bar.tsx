import type { StatusBarPaginationConfig } from '@/shared/ui/list-status-bar';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';

type SignalsOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination?: StatusBarPaginationConfig;
	showDirectionBadges: boolean;
	buyCount: number;
	sellCount: number;
};

export function SignalsOverviewStatusBar({
	totalCount,
	filteredCount,
	pagination,
	showDirectionBadges,
	buyCount,
	sellCount,
}: SignalsOverviewStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={pagination}
			badges={showDirectionBadges && (
				<>
					{buyCount > 0 && <ValueBadge variant='dot' color='green' size='sm' label='Покупать' value={buyCount} />}
					{sellCount > 0 && <ValueBadge variant='dot' color='red' size='sm' label='Продавать' value={sellCount} />}
				</>
			)}
		/>
	);
}
