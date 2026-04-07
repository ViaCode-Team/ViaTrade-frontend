import {
	ActionIcon,
	Badge,
	Box,
	Group,
	Text,
	Tooltip,
} from '@mantine/core';
import { IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet, IconLogout } from '@tabler/icons-react';
import dayjs from 'dayjs';

import type { UserSessionDto } from '@/shared/api';

import { InfoRow } from '@/shared/ui/info-row';

import { parseUserAgent } from '../../lib/parse-user-agent';
import classes from './sessions-list.module.css';

type SessionListItemProps = {
	session: UserSessionDto;
	isCurrent: boolean;
	onLogoutSession: (sessionId: string) => void;
};

const MOBILE_RE = /mobile|android|iphone/;
const TABLET_RE = /tablet|ipad/;

function getDeviceIcon(userAgent: string) {
	const normalizedUserAgent = userAgent.toLowerCase();

	if (MOBILE_RE.test(normalizedUserAgent))
		return <IconDeviceMobile size={24} className={classes.deviceIcon} />;
	if (TABLET_RE.test(normalizedUserAgent))
		return <IconDeviceTablet size={24} className={classes.deviceIcon} />;

	return <IconDeviceDesktop size={24} className={classes.deviceIcon} />;
}

export function SessionListItem({ session, isCurrent, onLogoutSession }: SessionListItemProps) {
	const createdAt = dayjs(session.createdAt).format('DD.MM.YYYY, HH:mm');
	const lastSeen = dayjs(session.lastSeen).format('DD.MM.YYYY, HH:mm');
	const logoutLabel = isCurrent ? 'Выйти' : 'Завершить сессию';

	return (
		<Box component='li' style={{ listStyle: 'none' }}>
			<InfoRow
				icon={getDeviceIcon(session.userAgent)}
				title={(
					<Group gap='xs' wrap='nowrap'>
						<Text size='sm' fw={700} className={classes.userAgent}>
							{parseUserAgent(session.userAgent)}
						</Text>
						{isCurrent && (
							<Badge color='green' variant='filled' size='xs'>
								Текущая
							</Badge>
						)}
					</Group>
				)}
				description={(
					<Text component='p' size='xs' className={classes.sessionMeta}>
						<Text component='span' inherit className={classes.sessionMetaItem}>
							Создана:
							{' '}
							{createdAt}
						</Text>
						<Text component='span' inherit className={classes.sessionMetaItem}>
							Активность:
							{' '}
							{lastSeen}
						</Text>
					</Text>
				)}
				rightSection={(
					<Tooltip label={logoutLabel}>
						<ActionIcon
							size='lg'
							variant='subtle'
							color='red'
							aria-label={logoutLabel}
							onClick={() => onLogoutSession(session.id)}
						>
							<IconLogout size={20} />
						</ActionIcon>
					</Tooltip>
				)}
			/>
		</Box>
	);
}
