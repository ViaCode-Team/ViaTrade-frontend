import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { logoutCurrentSessionSilently } from '@/entities/auth';
import { clearLocalAuthBlock, useSecurity } from '@/entities/security';

export function LocalAuthBlockedLogout() {
	const queryClient = useQueryClient();
	const { isLocalAuthBlocked, checkSecurityState } = useSecurity();

	useEffect(() => {
		if (!isLocalAuthBlocked)
			return;

		let isDisposed = false;
		let isLoggingOut = false;

		const logoutBlockedSession = async () => {
			if (isLoggingOut)
				return;

			isLoggingOut = true;

			try {
				const isLoggedOut = await logoutCurrentSessionSilently();

				if (isLoggedOut && !isDisposed) {
					await clearLocalAuthBlock(queryClient);
					await checkSecurityState();
				}
			}
			finally {
				isLoggingOut = false;
			}
		};

		const handleOnline = () => {
			void logoutBlockedSession();
		};

		void logoutBlockedSession();
		window.addEventListener('online', handleOnline);

		return () => {
			isDisposed = true;
			window.removeEventListener('online', handleOnline);
		};
	}, [isLocalAuthBlocked, queryClient, checkSecurityState]);

	return null;
}
