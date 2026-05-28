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

	return (
		<Stack gap='md'>
			{sessions.length === 0
				? (
						<EmptyState title='Активные сессии не найдены' />
					)
				: paginatedSessions.length === 0
					? (
							<EmptyState title='По вашему запросу ничего не найдено' />
						)
					: (
							<>
								<Stack component='ul' gap='xs'>
									{paginatedSessions.map((session) => {
										const isCurrent = session.id === currentSessionId;
										const logoutLabel = isCurrent ? 'Завершить текущую сессию' : 'Завершить сессию';

										return (
											<SessionListItem
												key={session.id}
												session={session}
												isCurrent={isCurrent}
												actionSlot={(
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
												)}
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
							</>
						)}
		</Stack>
	);
}

export const SessionsListBoundary = withQueryBoundary(SessionsList, {
	suspenseProps: {
		fallback: <SessionsListSkeleton />,
	},
});
