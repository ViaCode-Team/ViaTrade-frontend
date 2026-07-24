import type { ReactNode } from 'react';

import { Group, Text } from '@mantine/core';

type ListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	pagination?: {
		page: number;
		pageSize: number;
		showRange?: boolean;
	};
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
			<Group gap='md'>
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
