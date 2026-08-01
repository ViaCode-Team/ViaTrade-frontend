import { Center, Pagination, Stack } from '@mantine/core';

import type { UserSessionResponse } from '@/shared/api';
import type { PaginationConfig } from '@/shared/model';

import { SessionListItem } from '..';

export type SessionsListProps = {
	paginatedSessions: UserSessionResponse[];
	pagination?: PaginationConfig;
};

export function SessionsList({
	paginatedSessions,
	pagination,
}: SessionsListProps) {
	return (
		<Stack gap='md'>
			<Stack component='ul' gap='xs'>
				{paginatedSessions.map((session) => (
					<SessionListItem key={session.id} session={session} />
				))}
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
