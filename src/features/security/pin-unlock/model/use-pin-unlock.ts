import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useSecurity } from '@/entities/security';
import { milliseconds } from '@/shared/lib/milliseconds';
import {
	PIN_LOCKOUT_FAILURE_THRESHOLD,
	recordFailedPinAttempt,
	unlockApp,
} from '@/shared/lib/secure-storage';

import { usePinLockoutStatus } from './use-pin-lockout-status';

function formatRemainingTime(value: number): string {
	const totalSeconds = Math.ceil(value / milliseconds.fromSeconds(1));
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0)
		return `${hours} ч ${minutes} мин`;

	if (minutes > 0)
		return `${minutes} мин ${seconds} сек`;

	return `${seconds} сек`;
}

function getAttemptsBeforeNextLockout(failedAttempts: number): number {
	const attemptsInCurrentStep = failedAttempts % PIN_LOCKOUT_FAILURE_THRESHOLD;

	if (attemptsInCurrentStep === 0)
		return PIN_LOCKOUT_FAILURE_THRESHOLD;

	return PIN_LOCKOUT_FAILURE_THRESHOLD - attemptsInCurrentStep;
}

export function usePinUnlock() {
	const [pin, setPin] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
	const { checkSecurityState } = useSecurity();
	const {
		isLockedOut,
		lockoutRemainingMs,
		refreshLockoutStatus,
		setLockoutRemainingMs,
	} = usePinLockoutStatus();

	const handleComplete = async (value: string) => {
		setError(null);
		startLoading();

		try {
			const currentLockout = await refreshLockoutStatus();
			if (currentLockout.isLockedOut) {
				setPin('');
				setError(`Слишком много неверных попыток. Повторите через ${formatRemainingTime(currentLockout.remainingMs)}.`);
				return;
			}

			const success = await unlockApp(value);
			if (success) {
				setLockoutRemainingMs(0);
				await checkSecurityState();
			}
			else {
				const nextLockout = await recordFailedPinAttempt();
				setPin('');

				if (nextLockout.isLockedOut) {
					setLockoutRemainingMs(nextLockout.remainingMs);
					setError(`Слишком много неверных попыток. Повторите через ${formatRemainingTime(nextLockout.remainingMs)}.`);
					return;
				}

				const attemptsBeforeLockout = getAttemptsBeforeNextLockout(nextLockout.state.failedAttempts);
				setError(`Неверный ПИН-код. До временной блокировки: ${attemptsBeforeLockout}`);
			}
		}
		catch {
			setError('Произошла ошибка при разблокировке.');
			setPin('');
		}
		finally {
			stopLoading();
		}
	};

	const handleChange = (value: string) => {
		if (lockoutRemainingMs > 0)
			return;

		setPin(value);
		if (error)
			setError(null);
	};

	return {
		pin,
		error: isLockedOut
			? `Слишком много неверных попыток. Повторите через ${formatRemainingTime(lockoutRemainingMs)}.`
			: error,
		isLoading,
		isLockedOut,
		handleChange,
		handleComplete,
	};
}
