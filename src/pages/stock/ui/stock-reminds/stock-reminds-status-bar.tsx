import { ListStatusBar } from '@/shared/ui/list-status-bar';

type StockRemindsStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	page: number;
	pageSize: number;
	showRange: boolean;
};

export function StockRemindsStatusBar({
	totalCount,
	filteredCount,
	page,
	pageSize,
	showRange,
}: StockRemindsStatusBarProps) {
	return <ListStatusBar totalCount={totalCount} filteredCount={filteredCount} pagination={{ page, pageSize, showRange }} />;
}
