import {
	ActionIcon,
	Group,
	Pagination,
	Stack,
	Tooltip,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { SessionListItem } from '@/entities/session';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useSessionsOverview } from '../lib/use-sessions-overview';
import { SessionsListSkeleton } from './sessions-list.skeleton';

export function SessionsList() {
	const {
		sessions,
		paginatedSessions,
		currentSessionId,
		activePage,
		totalPages,
		setPage,
		handleLogoutSession,
	} = useSessionsOverview();

	if (sessions.length === 0) {
		return <EmptyState title='Нет активных сессий' description='Вы авторизованы только на этом устройстве.' />;
	}

	if (paginatedSessions.length === 0) {
		return <EmptyState title='Сессии не найдены' description='На этой странице нет активных сессий.' />;
	}

	return (
		<Stack gap='md'>
			<Stack component='ul' gap='xs'>
				{paginatedSessions.map((session) => {
					const isCurrent = session.id === currentSessionId;
					const logoutLabel = isCurrent ? 'Завершить текущую сессию' : 'Завершить сессию';

					return (
						<SessionListItem
							key={session.id}
							session={session}
							isCurrent={isCurrent}
							actionSlot={isCurrent
								? (
										<Tooltip label={logoutLabel}>
											<ActionIcon
												size='lg'
												variant='subtle'
												color='red'
												aria-label={logoutLabel}
												onClick={() => handleLogoutSession(session.id)}
											>
												<IconLogout size={20} />
											</ActionIcon>
										</Tooltip>
									)
								: null}
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

export const SessionsListBoundary = withQueryBoundary(SessionsList, {
	suspenseProps: {
		fallback: <SessionsListSkeleton />,
	},
});
