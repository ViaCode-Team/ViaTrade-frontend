import { Badge, Group, Paper, Text } from '@mantine/core';
import { IconMinus, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

import type { DashboardSignal } from '../model/dashboard-data';

import classes from '../dashboard-page.module.css';

type DashboardSignalCardProps = {
	signal: DashboardSignal;
};

function getDirectionProps(direction: DashboardSignal['direction']) {
	switch (direction) {
		case 'buy':
			return { color: 'green' as const, icon: <IconTrendingUp size={14} />, label: 'Покупка' };
		case 'sell':
			return { color: 'red' as const, icon: <IconTrendingDown size={14} />, label: 'Продажа' };
		case 'hold':
			return { color: 'gray' as const, icon: <IconMinus size={14} />, label: 'Держать' };
		default:
			return { color: 'gray' as const, icon: <IconMinus size={14} />, label: 'Держать' };
	}
}

function getStrengthColor(strength: number) {
	if (strength >= 70)
		return 'var(--mantine-color-green-6)';
	if (strength >= 50)
		return 'var(--mantine-color-yellow-6)';

	return 'var(--mantine-color-gray-5)';
}

export function DashboardSignalCard({ signal }: DashboardSignalCardProps) {
	const direction = getDirectionProps(signal.direction);

	return (
		<Paper className={classes.signalCard} withBorder p='sm'>
			<div className={classes.signalHeader}>
				<Group gap='xs'>
					<Badge
						color={direction.color}
						size='sm'
						leftSection={direction.icon}
						fw={600}
					>
						{direction.label}
					</Badge>
					<Text fw='bold'>{signal.asset}</Text>
				</Group>
				<Text size='xs' c='dimmed'>{signal.timestamp}</Text>
			</div>

			<div className={classes.signalFooter}>
				<Text size='sm' c='dimmed'>{signal.strategy}</Text>
				<Group gap='xs'>
					<Text size='xs' c='dimmed'>Сила:</Text>
					<div className={classes.strengthTrack}>
						<div
							className={classes.strengthBar}
							style={{
								width: `${signal.strength}%`,
								backgroundColor: getStrengthColor(signal.strength),
							}}
						/>
					</div>
					<Text size='xs' fw='bold' style={{ minWidth: 30 }}>
						{signal.strength}
						%
					</Text>
				</Group>
			</div>
		</Paper>
	);
}
