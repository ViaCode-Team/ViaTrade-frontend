import { ListStatusBar } from '@/shared/ui/list-status-bar';

type SessionsOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	page: number;
	pageSize: number;
	showRange: boolean;
};

export function SessionsOverviewStatusBar({
	totalCount,
	filteredCount,
	page,
	pageSize,
	showRange,
}: SessionsOverviewStatusBarProps) {
	return <ListStatusBar totalCount={totalCount} filteredCount={filteredCount} pagination={{ page, pageSize, showRange }} />;
}
