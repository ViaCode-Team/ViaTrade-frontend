import type { StatusBarPaginationConfig } from '@/shared/ui/list-status-bar';

import { ListStatusBar } from '@/shared/ui/list-status-bar';

type StockLinkedStrategiesListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination: StatusBarPaginationConfig;
};

export function StockLinkedStrategiesListStatusBar({
	totalCount,
	filteredCount,
	pagination,
}: StockLinkedStrategiesListStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={pagination}
		/>
	);
}
