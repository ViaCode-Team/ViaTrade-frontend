import type { ReactNode } from 'react';

import {
	Group,
	Pagination,
	Stack,
} from '@mantine/core';

import type { UserSessionDto } from '@/shared/api';

import { SessionListItem } from '..';

export type SessionsListProps = {
	paginatedSessions: UserSessionDto[];
	currentSessionId: string | undefined;
	activePage: number;
	totalPages: number;
	setPage: (page: number) => void;
	renderAction?: (session: UserSessionDto, isCurrent: boolean) => ReactNode;
};

export function SessionsList({
	paginatedSessions,
	currentSessionId,
	activePage,
	totalPages,
	setPage,
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

			{totalPages > 1 && (
				<Group justify='center' mt='sm'>
					<Pagination
						total={totalPages}
						value={activePage}
						onChange={setPage}
						size='sm'
					/>
				</Group>
			)}
		</Stack>
	);
}
