import {
	Group,
	Pagination,
	Stack,
} from '@mantine/core';

import type { UserSessionDto } from '@/shared/api';

import { AppEmptyState } from '@/shared/ui/app-empty-state';

import { SessionListItem } from '..';

export { SessionsListSkeleton } from './sessions-list.skeleton';

export type SessionsListProps = {
	sessions: UserSessionDto[];
	paginatedSessions: UserSessionDto[];
	currentSessionId: string | undefined;
	activePage: number;
	totalPages: number;
	setPage: (page: number) => void;
	actionSlot?: (session: UserSessionDto, isCurrent: boolean) => React.ReactNode;
};

export function SessionsList({
	sessions,
	paginatedSessions,
	currentSessionId,
	activePage,
	totalPages,
	setPage,
	actionSlot,
}: SessionsListProps) {
	if (sessions.length === 0) {
		return <AppEmptyState title='Нет активных сессий' description='Вы авторизованы только на этом устройстве.' />;
	}

	if (paginatedSessions.length === 0) {
		return <AppEmptyState title='Сессии не найдены' description='На этой странице нет активных сессий.' />;
	}

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
							actionSlot={actionSlot?.(session, isCurrent)}
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
