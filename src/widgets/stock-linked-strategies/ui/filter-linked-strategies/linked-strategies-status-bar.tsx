import { ListStatusBar } from '@/shared/ui/list-status-bar';

type LinkedStrategiesStatusBarProps = {
	totalCount: number;
	filteredCount: number;
};

export function LinkedStrategiesStatusBar({
	totalCount,
	filteredCount,
}: LinkedStrategiesStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
		/>
	);
}
