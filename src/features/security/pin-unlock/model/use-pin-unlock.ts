import { useState } from 'react';

import { logout } from '@/entities/auth/api/gen';
import { useSecurity } from '@/entities/security';
import { idbClear } from '@/shared/lib/idb';
import {
	MAX_FAILED_ATTEMPTS,
	recordFailedAttempt,
	resetFailedAttempts,
	unlockApp,
} from '@/shared/lib/secure-storage';

export function usePinUnlock() {
	const [pin, setPin] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { checkSecurityState } = useSecurity();

	const handleComplete = async (value: string) => {
		setError(null);
		setIsLoading(true);

		try {
			const success = await unlockApp(value);
			if (success) {
				resetFailedAttempts();
				await checkSecurityState();
			}
			else {
				const newAttempts = recordFailedAttempt();
				setPin('');

				if (newAttempts >= MAX_FAILED_ATTEMPTS) {
					// Try to call logout API to clear HttpOnly cookies (ignore error if offline)
					try {
						await logout();
					}
					catch (e) {
						console.warn('Logout API failed, possibly offline', e);
					}

					// Wipe all data and redirect to login
					await idbClear();
					localStorage.clear();
					sessionStorage.clear();
					window.location.href = '/login';
					return;
				}

				setError(`Неверный ПИН-код. Осталось попыток: ${MAX_FAILED_ATTEMPTS - newAttempts}`);
			}
		}
		catch {
			setError('Произошла ошибка при разблокировке.');
			setPin('');
		}
		finally {
			setIsLoading(false);
		}
	};

	const handleChange = (value: string) => {
		setPin(value);
		if (error)
			setError(null);
	};

	return {
		pin,
		error,
		isLoading,
		handleChange,
		handleComplete,
	};
}
