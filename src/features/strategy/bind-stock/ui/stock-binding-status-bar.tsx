import { Badge, Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

type StockBindingStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	selectedCount: number;
	pagination: {
		page: number;
		pageSize: number;
		showRange?: boolean;
	};
};

export function StockBindingStatusBar({
	totalCount,
	filteredCount,
	selectedCount,
	pagination,
}: StockBindingStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={pagination}
			badges={(
				<>
					{selectedCount > 0 && (
						<Badge variant='light' color='blue' size='sm' style={{ textTransform: 'none' }}>
							Выбрано:
							{' '}
							{selectedCount}
						</Badge>
					)}
				</>
			)}
		/>
	);
}

export const StockBindingStatusBarBoundary = withQueryBoundary(StockBindingStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={20} width='100%' />,

	},
});
