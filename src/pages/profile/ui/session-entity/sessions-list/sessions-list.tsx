import type { ReactNode } from 'react';

import { Center, Pagination, Stack } from '@mantine/core';

import type { UserSessionDto } from '@/shared/api';
import type { PaginationConfig } from '@/shared/model';

import { SessionListItem } from '..';

export type SessionsListProps = {
	paginatedSessions: UserSessionDto[];
	currentSessionId: string | undefined;
	pagination?: PaginationConfig;
	renderAction?: (session: UserSessionDto, isCurrent: boolean) => ReactNode;
};

export function SessionsList({
	paginatedSessions,
	currentSessionId,
	pagination,
	renderAction,
}: SessionsListProps) {
	return (
		<Stack gap='md'>
			<Stack component='ul' gap='xs'>
				{paginatedSessions.map((session) => {
					const isCurrent = session.id === currentSessionId;

					return (
						<SessionListItem
							key={session.id}
							session={session}
							isCurrent={isCurrent}
							actionSlot={renderAction?.(session, isCurrent)}
						/>
					);
				})}
			</Stack>

			{pagination && (
				<Center>
					<Pagination
						total={pagination.totalPages}
						value={pagination.page}
						onChange={pagination.onPageChange}
					/>
				</Center>
			)}
		</Stack>
	);
}
