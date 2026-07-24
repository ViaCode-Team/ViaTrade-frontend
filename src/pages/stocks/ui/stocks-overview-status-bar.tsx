import { ListStatusBar } from '@/shared/ui/list-status-bar';

type StocksListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	page: number;
	pageSize: number;
	showRange: boolean;
};

export function StocksOverviewStatusBar({
	totalCount,
	filteredCount,
	page,
	pageSize,
	showRange,
}: StocksListStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={{ page, pageSize, showRange }}
		/>
	);
}
