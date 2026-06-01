import type { ReactNode } from 'react';

import { Badge, Group, Text, Tooltip } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { IconRefresh } from '@tabler/icons-react';
import { useCallback, useState } from 'react';

import { useAppNetwork } from '@/shared/lib/hooks';
import { showNoNetworkNotification } from '@/shared/lib/no-network';

type ListStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	badges?: ReactNode;
	refreshIntervalText?: string;
	onRefresh?: () => void;
};

export function ListStatusBar({
	totalCount,
	filteredCount,
	badges,
	refreshIntervalText,
	onRefresh,
}: ListStatusBarProps) {
	const { isOnline } = useAppNetwork();

	const [throttleSeconds, setThrottleSeconds] = useState(0);
	const interval = useInterval(() => {
		setThrottleSeconds((s) => {
			if (s <= 1) {
				interval.stop();
				return 0;
			}
			return s - 1;
		});
	}, 1000);

	const handleRefresh = useCallback(() => {
		if (!isOnline) {
			showNoNetworkNotification();
			return;
		}

		if (throttleSeconds > 0)
			return;

		onRefresh?.();
		setThrottleSeconds(5);
		interval.start();
	}, [throttleSeconds, isOnline, onRefresh, interval]);


	const isThrottled = throttleSeconds > 0;
	const isInteractive = Boolean(onRefresh) && !isThrottled;

	const labelTooltipText = isInteractive
		? 'Нажмите, чтобы обновить данные прямо сейчас. Данные также обновляются автоматически.'
		: isThrottled
			? `Ручное обновление будет доступно через ${throttleSeconds} сек.`
			: 'Данные обновляются автоматически';

	const displayText = isThrottled
		? `Обновление через ${throttleSeconds}с`
		: refreshIntervalText;

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
					<Tooltip label={labelTooltipText}>
						<Badge
							variant={isThrottled ? 'light' : 'default'}
							size='sm'
							color={isThrottled ? 'gray' : undefined}
							leftSection={<IconRefresh size={12} />}
							style={{
								textTransform: 'none',
								cursor: isInteractive ? 'pointer' : 'default',
								opacity: isThrottled ? 0.7 : 1,
							}}
							component={onRefresh ? 'button' : 'div'}
							onClick={isInteractive ? handleRefresh : undefined}
							disabled={isThrottled}
						>
							{displayText}
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
