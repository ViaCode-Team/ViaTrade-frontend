import { useLogout } from '@/entities/auth';

import { useSessionLogoutFlow } from './use-session-logout-flow';

export function useCurrentSessionLogout() {
	const { mutationOptions, requestLogout } = useSessionLogoutFlow();
	const { mutate: logoutCurrentSession, isPending } = useLogout({
		skipInvalidation: true,
		mutation: mutationOptions,
	});

	const requestLogoutCurrentSession = () => {
		requestLogout({
			title: 'Выйти из текущей сессии?',
			description: 'После подтверждения текущая сессия будет завершена, и потребуется войти заново.',
			confirmLabel: 'Выйти',
		}, logoutCurrentSession);
	};

	return {
		isLoggingOutCurrentSession: isPending,
		requestLogoutCurrentSession,
	};
}
