import { useIdle } from '@mantine/hooks';
import { useEffect } from 'react';

import { useSecurity } from '@/entities/security';
import { milliseconds } from '@/shared/lib/milliseconds';
import { lockApp } from '@/shared/lib/secure-storage';

const INACTIVITY_TIMEOUT_MS = milliseconds.fromMinutes(15);
const EVENTS: (keyof DocumentEventMap)[] = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

export function InactivityLock() {
	const { isLocked, checkSecurityState } = useSecurity();
	const idle = useIdle(INACTIVITY_TIMEOUT_MS, { events: EVENTS, initialState: false });

	useEffect(() => {
		if (idle && !isLocked) {
			const lock = async () => {
				lockApp();
				await checkSecurityState();
			};
			lock();
		}
	}, [idle, isLocked, checkSecurityState]);

	return null;
}
