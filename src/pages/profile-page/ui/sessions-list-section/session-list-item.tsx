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
import cls from './sessions-list.module.css';

type SessionListItemProps = {
	session: UserSessionDto;
	isCurrent: boolean;
	onLogoutSession: (sessionId: string) => void;
};

type SessionMetaItemProps = {
	label: string;
	value: string;
};

const SESSION_DATE_FORMAT = 'DD.MM.YYYY, HH:mm';
const MOBILE_RE = /mobile|android|iphone/;
const TABLET_RE = /tablet|ipad/;

function formatSessionDate(date: Date | string) {
	return dayjs(date).format(SESSION_DATE_FORMAT);
}

function getDeviceIcon(userAgent: string) {
	const normalizedUserAgent = userAgent.toLowerCase();

	if (MOBILE_RE.test(normalizedUserAgent))
		return <IconDeviceMobile size={24} className={cls.deviceIcon} />;
	if (TABLET_RE.test(normalizedUserAgent))
		return <IconDeviceTablet size={24} className={cls.deviceIcon} />;

	return <IconDeviceDesktop size={24} className={cls.deviceIcon} />;
}

function SessionMetaItem({ label, value }: SessionMetaItemProps) {
	return (
		<Text span inherit className={cls.sessionMetaItem}>
			{label}
			:
			{' '}
			{value}
		</Text>
	);
}

export function SessionListItem({ session, isCurrent, onLogoutSession }: SessionListItemProps) {
	const createdAt = formatSessionDate(session.createdAt);
	const lastSeen = formatSessionDate(session.lastSeen);
	const logoutLabel = isCurrent ? 'Выйти' : 'Завершить сессию';

	return (
		<Box component='li'>
			<InfoRow
				icon={getDeviceIcon(session.userAgent)}
				title={(
					<Group gap='xs' wrap='nowrap'>
						<Text size='sm' fw={700} className={cls.userAgent}>
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
					<Text component='p' size='xs' c='dimmed' className={cls.sessionMeta}>
						<SessionMetaItem label='Создана' value={createdAt} />
						<SessionMetaItem label='Активность' value={lastSeen} />
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
