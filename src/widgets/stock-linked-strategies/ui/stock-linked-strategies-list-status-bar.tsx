import { ListStatusBar } from '@/shared/ui/list-status-bar';

type StockLinkedStrategiesListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	page: number;
	pageSize: number;
	showRange: boolean;
};

export function StockLinkedStrategiesListStatusBar({
	totalCount,
	filteredCount,
	page,
	pageSize,
	showRange,
}: StockLinkedStrategiesListStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={{ page, pageSize, showRange }}
		/>
	);
}
