import type { ReactNode } from 'react';

import {
	Box,
	Title,
} from '@mantine/core';

import type { UserSessionDto } from '@/shared/api';

import { InfoRow } from '@/shared/ui/info-row';

import { parseUserAgent } from '../lib/parse-user-agent';
import { SessionDeviceIcon } from './session-device-icon';
import { SessionMeta } from './session-meta';

type SessionListItemProps = {
	session: UserSessionDto;
	isCurrent: boolean;
	actionSlot?: ReactNode;
};

export function SessionListItem({ session, isCurrent, actionSlot }: SessionListItemProps) {
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
				rightSection={actionSlot}
			/>
		</Box>
	);
}
