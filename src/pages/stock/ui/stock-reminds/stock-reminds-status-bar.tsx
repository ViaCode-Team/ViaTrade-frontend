import type { StatusBarPaginationConfig } from '@/shared/ui/list-status-bar';

import { ListStatusBar } from '@/shared/ui/list-status-bar';

type StockRemindsStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination: StatusBarPaginationConfig;
};

export function StockRemindsStatusBar({
	totalCount,
	filteredCount,
	pagination,
}: StockRemindsStatusBarProps) {
	return <ListStatusBar totalCount={totalCount} filteredCount={filteredCount} pagination={pagination} />;
}
