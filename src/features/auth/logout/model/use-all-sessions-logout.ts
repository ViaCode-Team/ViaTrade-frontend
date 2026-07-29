import { useDeleteSessions } from '@/entities/session';

import { useSessionLogoutFlow } from './use-session-logout-flow';

export function useAllSessionsLogout() {
	const { mutationOptions, requestLogout } = useSessionLogoutFlow();
	const { mutate: logoutAll, isPending } = useDeleteSessions({
		skipInvalidation: true,
		mutation: mutationOptions,
	});

	const requestLogoutAll = () => {
		requestLogout({
			title: 'Выйти из всех сессий?',
			description: 'После подтверждения все активные сессии будут завершены, и потребуется войти заново.',
			confirmLabel: 'Выйти',
		}, logoutAll);
	};

	return {
		isLoggingOutAll: isPending,
		requestLogoutAll,
	};
}
