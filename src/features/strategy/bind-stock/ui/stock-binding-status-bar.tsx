import { Badge } from '@mantine/core';

import type { StatusBarPaginationConfig } from '@/shared/ui/list-status-bar';

import { ListStatusBar } from '@/shared/ui/list-status-bar';

type StockBindingStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	selectedCount: number;
	pagination: StatusBarPaginationConfig;
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
