import type { ReactNode } from 'react';

import { Group, Pagination, Text } from '@mantine/core';

import type { PaginationConfig } from '@/shared/model';

export type StatusBarPaginationConfig = PaginationConfig & {
	pageSize: number;
	showRange?: boolean;
};

type ListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination?: StatusBarPaginationConfig;
	badges?: ReactNode;
};

export function ListStatusBar({
	totalCount,
	filteredCount,
	pagination,
	badges,
}: ListStatusBarProps) {
	const isFiltered = totalCount !== filteredCount;
	const shouldShowRange = pagination?.showRange !== false && pagination !== undefined;
	const firstItem = shouldShowRange ? (pagination.page - 1) * pagination.pageSize + 1 : 0;
	const lastItem = shouldShowRange ? Math.min(firstItem + filteredCount - 1, totalCount) : 0;
	const status = shouldShowRange
		? `${firstItem}–${lastItem} из ${totalCount}`
		: `Показано: ${filteredCount}${isFiltered ? ` из ${totalCount}` : ''}`;

	return (
		<Group justify='space-between' align='center' wrap='wrap' gap='xs'>
			<Group gap='md' align='center'>
				{pagination && (
					<Pagination
						total={pagination.totalPages}
						value={pagination.page}
						onChange={pagination.onPageChange}
						size='sm'
					/>
				)}

				<Text size='sm' c='dimmed'>
					{status}
				</Text>
			</Group>

			{filteredCount > 0 && badges && (
				<Group gap='sm' wrap='wrap'>
					{badges}
				</Group>
			)}
		</Group>
	);
}
