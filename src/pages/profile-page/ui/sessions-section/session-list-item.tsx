import {
	ActionIcon,
	Box,
	Title,
	Tooltip,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import type { UserSessionDto } from '@/shared/api';

import { InfoRow } from '@/shared/ui/info-row';

import { parseUserAgent } from '../../lib/parse-user-agent';
import { SessionDeviceIcon } from './session-device-icon';
import { SessionMeta } from './session-meta';

type SessionListItemProps = {
	session: UserSessionDto;
	isCurrent: boolean;
	onLogoutSession: (sessionId: string) => void;
};

export function SessionListItem({ session, isCurrent, onLogoutSession }: SessionListItemProps) {
	const logoutLabel = isCurrent ? 'Завершить текущую сессию   ' : 'Завершить сессию';

	return (
		<Box component='li'>
			<InfoRow
				icon={<SessionDeviceIcon userAgent={session.userAgent} isCurrent={isCurrent} />}
				title={(
					<Title order={5} textWrap='nowrap' style={{ overflow: 'auto' }}>
						{parseUserAgent(session.userAgent)}
					</Title>
				)}
				description={<SessionMeta createdAt={session.createdAt} lastSeen={session.lastSeen} />}
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
