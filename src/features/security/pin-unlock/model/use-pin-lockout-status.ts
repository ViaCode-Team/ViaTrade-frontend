import { useInterval } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';

import { usePageResumeEffect } from '@/shared/lib/hooks';
import { milliseconds } from '@/shared/lib/milliseconds';
import { getPinLockoutStatus } from '@/shared/lib/secure-storage';

const PIN_LOCKOUT_REFRESH_INTERVAL_MS = milliseconds.fromSeconds(1);

export function usePinLockoutStatus() {
	const [lockoutRemainingMs, setLockoutRemainingMs] = useState(0);

	const refreshLockoutStatus = useCallback(async () => {
		const status = await getPinLockoutStatus();
		setLockoutRemainingMs(status.remainingMs);
		return status;
	}, []);

	const isLockedOut = lockoutRemainingMs > 0;

	useRefreshPinLockoutStatus({
		isLockedOut,
		refreshLockoutStatus,
	});

	return {
		isLockedOut,
		lockoutRemainingMs,
		refreshLockoutStatus,
		setLockoutRemainingMs,
	};
}

function useRefreshPinLockoutStatus({
	isLockedOut,
	refreshLockoutStatus,
}: {
	isLockedOut: boolean;
	refreshLockoutStatus: () => Promise<unknown>;
}) {
	const lockoutInterval = useInterval(() => {
		void refreshLockoutStatus();
	}, PIN_LOCKOUT_REFRESH_INTERVAL_MS);

	useEffect(() => {
		void refreshLockoutStatus();
	}, [refreshLockoutStatus]);

	useEffect(() => {
		if (isLockedOut) {
			lockoutInterval.start();
		}
		else {
			lockoutInterval.stop();
		}

		return lockoutInterval.stop;
	}, [isLockedOut, lockoutInterval]);

	usePageResumeEffect(refreshLockoutStatus);
}
