import type { ReactNode } from 'react';

import { Group, Text } from '@mantine/core';

type ListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	badges?: ReactNode;
};

export function ListStatusBar({
	totalCount,
	filteredCount,
	badges,
}: ListStatusBarProps) {
	const isFiltered = totalCount !== filteredCount;

	return (
		<Group justify='space-between' align='center'>
			<Group gap='md'>
				<Text size='sm' c='dimmed'>
					Показано:
					{' '}
					<Text span fw={500} c='var(--mantine-color-text)'>
						{filteredCount}
					</Text>
					{isFiltered && ` из ${totalCount}`}
				</Text>
			</Group>

			{filteredCount > 0 && badges && (
				<Group gap='sm'>
					{badges}
				</Group>
			)}
		</Group>
	);
}
