import {
	Box,
	Title,
} from '@mantine/core';

import type { UserSessionResponse } from '@/shared/api';

import { InfoRow } from '@/shared/ui/info-row';

import { parseUserAgent } from './parse-user-agent';
import { SessionDeviceIcon } from './session-device-icon';
import { SessionMeta } from './session-meta';

type SessionListItemProps = {
	session: UserSessionResponse;
};

export function SessionListItem({ session }: SessionListItemProps) {
	return (
		<Box component='li'>
			<InfoRow
				icon={<SessionDeviceIcon userAgent={session.userAgent} isCurrent={session.isCurrent} />}
				title={(
					<Title order={5} textWrap='nowrap' style={{ overflow: 'auto' }}>
						{parseUserAgent(session.userAgent)}
					</Title>
				)}
				description={<SessionMeta createdAt={session.createdAt} lastSeen={session.lastSeen} />}
			/>
		</Box>
	);
}
