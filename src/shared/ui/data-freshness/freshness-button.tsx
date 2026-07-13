import { Button, Loader } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import dayjs from 'dayjs';

import type { DataFreshnessState } from './use-data-freshness';

type FreshnessStateKey = 'fetching' | 'cooldown' | 'offline' | 'ready';

type FreshnessStateConfig = {
	icon: React.ReactNode;
	label: string;
	disabled: boolean;
};

const ICON_REFRESH = <IconRefresh size={14} />;
const ICON_LOADER = <Loader size={12} />;

function formatUpdatedAt(ts: number): string {
	const date = dayjs(ts);
	const isToday = date.isSame(dayjs(), 'day');
	return isToday ? date.format('HH:mm') : date.format('DD.MM HH:mm');
}

function getStateKey(
	isFetching: boolean,
	cooldownSecondsLeft: number,
	isOnline: boolean,
): FreshnessStateKey {
	if (isFetching)
		return 'fetching';
	if (cooldownSecondsLeft > 0)
		return 'cooldown';
	if (!isOnline)
		return 'offline';
	return 'ready';
}

function getStateConfig(key: FreshnessStateKey, short: string, cooldownSecondsLeft: number): FreshnessStateConfig {
	switch (key) {
		case 'fetching': return { icon: ICON_LOADER, label: 'Обновление...', disabled: true };
		case 'cooldown': return { icon: ICON_REFRESH, label: `Обновить через ${cooldownSecondsLeft}с`, disabled: true };
		case 'offline': return { icon: ICON_REFRESH, label: `Обновлено в ${short}`, disabled: true };
		case 'ready': return { icon: ICON_REFRESH, label: `Обновлено в ${short}`, disabled: false };
	}
}

export function FreshnessButton({
	updatedAt,
	isFetching,
	isOnline,
	cooldownSecondsLeft,
	onRefresh,
}: DataFreshnessState) {
	if (!updatedAt)
		return null;

	const stateKey = getStateKey(isFetching, cooldownSecondsLeft, isOnline);
	const { icon, label, disabled } = getStateConfig(stateKey, formatUpdatedAt(updatedAt), cooldownSecondsLeft);

	return (
		<Button
			variant='default'
			leftSection={icon}
			disabled={disabled}
			onClick={onRefresh}
			size='compact-xs'
		>
			{label}
		</Button>
	);
}
