import type { StatusBarPaginationConfig } from '@/shared/ui/list-status-bar';

import { ListStatusBar } from '@/shared/ui/list-status-bar';

type RemindsOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination: StatusBarPaginationConfig;
};

export function RemindsOverviewStatusBar({
	totalCount,
	filteredCount,
	pagination,
}: RemindsOverviewStatusBarProps) {
	return <ListStatusBar totalCount={totalCount} filteredCount={filteredCount} pagination={pagination} />;
}
