import { useEffect, useRef } from 'react';

import { useSecurity } from '@/entities/security';
import { lockApp } from '@/shared/lib/secure-storage';

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export function InactivityLock() {
	const { isLocked, checkSecurityState } = useSecurity();
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		const resetTimer = () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}

			if (isLocked)
				return;

			timerRef.current = window.setTimeout(async () => {
				lockApp();
				await checkSecurityState();
			}, INACTIVITY_TIMEOUT_MS);
		};

		const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

		const handleActivity = () => {
			resetTimer();
		};

		resetTimer();

		events.forEach((event) => {
			window.addEventListener(event, handleActivity, { passive: true });
		});

		return () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}
			events.forEach((event) => {
				window.removeEventListener(event, handleActivity);
			});
		};
	}, [isLocked, checkSecurityState]);

	return null;
}
