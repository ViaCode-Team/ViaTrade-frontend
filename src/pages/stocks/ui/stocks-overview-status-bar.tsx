import type { StatusBarPaginationConfig } from '@/shared/ui/list-status-bar';

import { ListStatusBar } from '@/shared/ui/list-status-bar';

type StocksListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination: StatusBarPaginationConfig;
};

export function StocksOverviewStatusBar({
	totalCount,
	filteredCount,
	pagination,
}: StocksListStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={pagination}
		/>
	);
}
