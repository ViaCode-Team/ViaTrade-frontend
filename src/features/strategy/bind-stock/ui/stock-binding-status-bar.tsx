import { Badge, Pagination } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';

type StockBindingStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	selectedCount: number;
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export function StockBindingStatusBar({
	totalCount,
	filteredCount,
	selectedCount,
	page,
	totalPages,
	onPageChange,
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
					{totalPages > 1 && (
						<Pagination
							value={page}
							onChange={onPageChange}
							total={totalPages}
							size='sm'
							radius='md'
							withEdges
						/>
					)}
				</>
			)}
		/>
	);
}
