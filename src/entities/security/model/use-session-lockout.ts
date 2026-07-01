import { useDocumentVisibility, useWindowEvent } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import {
	getUnlockDeadlineAt,
	isUnlockDeadlineExpired,
	lockAppSession,
	subscribeToSecuritySessionEvents,
} from '@/shared/lib/secure-storage';

/**
 * Enforces the absolute unlock deadline without polling.
 */
export function useSessionLockout(
	isLocked: boolean,
	checkSecurityState: () => Promise<void>,
) {
	const queryClient = useQueryClient();
	const deadlineTimerRef = useRef<number | null>(null);

	const clearDeadlineTimer = useCallback(() => {
		if (deadlineTimerRef.current !== null) {
			window.clearTimeout(deadlineTimerRef.current);
			deadlineTimerRef.current = null;
		}
	}, []);

	const verifySession = useCallback(async () => {
		if (isLocked)
			return false;

		if (await isUnlockDeadlineExpired()) {
			await lockAppSession(queryClient);
			await checkSecurityState();
			return true;
		}

		return false;
	}, [isLocked, queryClient, checkSecurityState]);

	const scheduleDeadlineLock = useCallback(async () => {
		clearDeadlineTimer();

		if (isLocked)
			return;

		const deadlineAt = await getUnlockDeadlineAt();
		if (deadlineAt === null)
			return;

		const delay = Math.max(deadlineAt - Date.now(), 0);
		deadlineTimerRef.current = window.setTimeout(() => {
			void verifySession();
		}, delay);
	}, [clearDeadlineTimer, isLocked, verifySession]);

	const refreshDeadlineLock = useCallback(async () => {
		const lockedByDeadline = await verifySession();
		if (lockedByDeadline)
			return;

		await scheduleDeadlineLock();
	}, [scheduleDeadlineLock, verifySession]);

	const documentVisibility = useDocumentVisibility();

	useEffect(() => {
		void refreshDeadlineLock();

		return clearDeadlineTimer;
	}, [clearDeadlineTimer, refreshDeadlineLock]);

	useEffect(() => {
		if (documentVisibility === 'visible') {
			void refreshDeadlineLock();
		}
	}, [documentVisibility, refreshDeadlineLock]);

	useWindowEvent('focus', () => {
		void refreshDeadlineLock();
	});

	useWindowEvent('pageshow', () => {
		void refreshDeadlineLock();
	});

	useEffect(() => {
		return subscribeToSecuritySessionEvents((event) => {
			if (event.type === 'locked') {
				void lockAppSession(queryClient, { broadcast: false }).then(checkSecurityState);
				return;
			}

			void refreshDeadlineLock();
		});
	}, [checkSecurityState, queryClient, refreshDeadlineLock]);
}
