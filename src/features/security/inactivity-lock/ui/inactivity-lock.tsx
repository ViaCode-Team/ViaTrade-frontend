import { useIdle } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useSecurity } from '@/entities/security';
import { milliseconds } from '@/shared/lib/milliseconds';
import { lockAppSession } from '@/shared/lib/secure-storage';

const INACTIVITY_TIMEOUT_MS = milliseconds.fromMinutes(15);
const EVENTS: (keyof DocumentEventMap)[] = [
	'pointermove',
	'pointerdown',
	'mousemove',
	'mousedown',
	'keydown',
	'touchstart',
	'touchmove',
	'wheel',
	'scroll',
];

export function InactivityLock() {
	const { isLocked, checkSecurityState } = useSecurity();
	const queryClient = useQueryClient();
	const idle = useIdle(INACTIVITY_TIMEOUT_MS, { events: EVENTS, initialState: false });

	useEffect(() => {
		if (idle && !isLocked) {
			const lock = async () => {
				await lockAppSession(queryClient);
				await checkSecurityState();
			};
			lock();
		}
	}, [idle, isLocked, queryClient, checkSecurityState]);

	return null;
}
