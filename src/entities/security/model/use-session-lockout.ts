import { useEffect } from 'react';

import { checkCookieLockState, lockApp } from '@/shared/lib/secure-storage';

/**
 * Hook to enforce session lockouts based on the presence of the secure cookie.
 * It checks periodically and when the window gains focus.
 */
export function useSessionLockout(
	isLocked: boolean,
	checkSecurityState: () => void,
) {
	useEffect(() => {
		if (isLocked)
			return;

		const verifySession = () => {
			const hasCookie = checkCookieLockState();
			if (!hasCookie) {
				lockApp();
				checkSecurityState(); // Update context and trigger redirect
			}
		};

		// Check immediately
		verifySession();

		// Check when user switches back to the tab
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				verifySession();
			}
		};

		window.addEventListener('focus', verifySession);
		window.addEventListener('visibilitychange', handleVisibilityChange);

		// Check periodically (every 5 seconds)
		const intervalId = setInterval(verifySession, 5_000);

		return () => {
			clearInterval(intervalId);
			window.removeEventListener('focus', verifySession);
			window.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [isLocked, checkSecurityState]);
}
