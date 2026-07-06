import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { usePageResumeEffect } from '@/shared/lib/hooks';
import { milliseconds } from '@/shared/lib/milliseconds';
import {
	getUnlockDeadlineAt,
	isUnlockDeadlineExpired,
	lockAppSession,
	subscribeToSecuritySessionEvents,
} from '@/shared/lib/secure-storage';

const IMMEDIATE_DEADLINE_DELAY_MS = milliseconds.fromMilliseconds(0);

type CheckSecurityState = () => Promise<void>;

/**
 * Enforces the absolute unlock deadline without polling.
 */
export function useSessionLockout(
	isLocked: boolean,
	checkSecurityState: CheckSecurityState,
) {
	const queryClient = useQueryClient();

	const {
		refreshSessionLockoutTimer,
		disposeSessionLockoutTimer,
	} = useSessionLockoutTimer({
		isLocked,
		checkSecurityState,
		queryClient,
	});

	useEffect(() => {
		void refreshSessionLockoutTimer();

		return disposeSessionLockoutTimer;
	}, [disposeSessionLockoutTimer, refreshSessionLockoutTimer]);

	usePageResumeEffect(refreshSessionLockoutTimer);
	useSyncSessionLockoutAcrossTabs({
		checkSecurityState,
		queryClient,
		refreshSessionLockoutTimer,
	});
}

function useSessionLockoutTimer({
	isLocked,
	checkSecurityState,
	queryClient,
}: {
	isLocked: boolean;
	checkSecurityState: CheckSecurityState;
	queryClient: ReturnType<typeof useQueryClient>;
}) {
	const lockoutTimerRef = useRef<number | null>(null);
	const refreshVersionRef = useRef(0);

	const clearSessionLockoutTimer = useCallback(() => {
		if (lockoutTimerRef.current === null)
			return;

		window.clearTimeout(lockoutTimerRef.current);
		lockoutTimerRef.current = null;
	}, []);

	const lockSessionIfLockoutDeadlineExpired = useCallback(async () => {
		if (isLocked)
			return false;

		if (!await isUnlockDeadlineExpired())
			return false;

		await lockAppSession(queryClient);
		await checkSecurityState();
		return true;
	}, [isLocked, queryClient, checkSecurityState]);

	const refreshSessionLockoutTimer = useCallback(async () => {
		const refreshVersion = refreshVersionRef.current + 1;
		refreshVersionRef.current = refreshVersion;
		clearSessionLockoutTimer();

		if (isLocked)
			return;

		const lockedByLockoutDeadline = await lockSessionIfLockoutDeadlineExpired();
		if (lockedByLockoutDeadline)
			return;

		const lockoutDeadlineAt = await getUnlockDeadlineAt();
		if (refreshVersionRef.current !== refreshVersion || lockoutDeadlineAt === null)
			return;

		lockoutTimerRef.current = window.setTimeout(() => {
			void lockSessionIfLockoutDeadlineExpired();
		}, getLockoutDelayMs(lockoutDeadlineAt));
	}, [clearSessionLockoutTimer, isLocked, lockSessionIfLockoutDeadlineExpired]);

	const disposeSessionLockoutTimer = useCallback(() => {
		refreshVersionRef.current += 1;
		clearSessionLockoutTimer();
	}, [clearSessionLockoutTimer]);

	return {
		disposeSessionLockoutTimer,
		refreshSessionLockoutTimer,
	};
}

function useSyncSessionLockoutAcrossTabs({
	checkSecurityState,
	queryClient,
	refreshSessionLockoutTimer,
}: {
	checkSecurityState: CheckSecurityState;
	queryClient: ReturnType<typeof useQueryClient>;
	refreshSessionLockoutTimer: () => Promise<void>;
}) {
	useEffect(() => {
		return subscribeToSecuritySessionEvents((event) => {
			if (event.type === 'locked') {
				void lockAppSession(queryClient, { broadcast: false }).then(checkSecurityState);
				return;
			}

			void refreshSessionLockoutTimer();
		});
	}, [checkSecurityState, queryClient, refreshSessionLockoutTimer]);
}

function getLockoutDelayMs(lockoutDeadlineAt: number): number {
	return Math.max(lockoutDeadlineAt - Date.now(), IMMEDIATE_DEADLINE_DELAY_MS);
}
