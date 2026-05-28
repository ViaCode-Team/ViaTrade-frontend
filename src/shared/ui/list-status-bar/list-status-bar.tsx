import type { ReactNode } from 'react';

import { Badge, Group, Text, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';

type ListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	badges?: ReactNode;
	refreshIntervalText?: string;
};

export function ListStatusBar({
	totalCount,
	filteredCount,
	badges,
	refreshIntervalText,
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

				{refreshIntervalText && (
					<Tooltip label='Данные обновляются автоматически'>
						<Badge
							variant='default'
							size='sm'
							leftSection={<IconRefresh size={12} />}
							style={{ textTransform: 'none' }}
						>
							{refreshIntervalText}
						</Badge>
					</Tooltip>
				)}
			</Group>

			{filteredCount > 0 && badges && (
				<Group gap='sm'>
					{badges}
				</Group>
			)}
		</Group>
	);
}
