import { useDocumentVisibility, useInterval, useWindowEvent } from '@mantine/hooks';
import { useCallback, useEffect } from 'react';

import { checkCookieLockState, lockApp } from '@/shared/lib/secure-storage';

/**
 * Hook to enforce session lockouts based on the presence of the secure cookie.
 * It checks periodically and when the window gains focus.
 */
export function useSessionLockout(
	isLocked: boolean,
	checkSecurityState: () => void,
) {
	const verifySession = useCallback(() => {
		if (isLocked)
			return;

		const hasCookie = checkCookieLockState();
		if (!hasCookie) {
			lockApp();
			checkSecurityState(); // Update context and trigger redirect
		}
	}, [isLocked, checkSecurityState]);

	const interval = useInterval(verifySession, 5_000);
	const documentVisibility = useDocumentVisibility();

	useEffect(() => {
		verifySession();
	}, [verifySession]);

	useEffect(() => {
		if (!isLocked) {
			interval.start();
		}
		else {
			interval.stop();
		}
		return interval.stop;
	}, [isLocked, interval]);

	useEffect(() => {
		if (documentVisibility === 'visible') {
			verifySession();
		}
	}, [documentVisibility, verifySession]);

	useWindowEvent('focus', verifySession);
}
