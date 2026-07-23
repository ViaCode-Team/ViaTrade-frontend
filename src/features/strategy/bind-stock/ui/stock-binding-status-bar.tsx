import { Badge, Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

type StockBindingStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	selectedCount: number;
};

export function StockBindingStatusBar({
	totalCount,
	filteredCount,
	selectedCount,
}: StockBindingStatusBarProps) {
	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
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
