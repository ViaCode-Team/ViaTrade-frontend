import { ListStatusBar } from '@/shared/ui/list-status-bar';

type RemindsOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	page: number;
	pageSize: number;
	showRange: boolean;
};

export function RemindsOverviewStatusBar({
	totalCount,
	filteredCount,
	page,
	pageSize,
	showRange,
}: RemindsOverviewStatusBarProps) {
	return <ListStatusBar totalCount={totalCount} filteredCount={filteredCount} pagination={{ page, pageSize, showRange }} />;
}
