import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { logout } from '@/entities/auth/api/gen';
import { useSecurity } from '@/entities/security';
import { clearLocalData } from '@/shared/lib/auth/clear-local-data';
import {
	FAILED_ATTEMPTS_KEY,
	MAX_FAILED_ATTEMPTS,
	unlockApp,
} from '@/shared/lib/secure-storage';

export function usePinUnlock() {
	const queryClient = useQueryClient();
	const [pin, setPin] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
	const { checkSecurityState } = useSecurity();
	const [failedAttempts, setFailedAttempts] = useLocalStorage<number>({
		key: FAILED_ATTEMPTS_KEY,
		defaultValue: 0,
	});

	const handleComplete = async (value: string) => {
		setError(null);
		startLoading();

		try {
			const success = await unlockApp(value);
			if (success) {
				setFailedAttempts(0);
				await checkSecurityState();
			}
			else {
				const newAttempts = failedAttempts + 1;
				setFailedAttempts(newAttempts);
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
					await clearLocalData(queryClient);
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
			stopLoading();
		}
	};

	const handleChange = (value: string) => {
		setPin(value);
		if (error)
			setError(null);
	};

	const handleLogout = async () => {
		startLoading();
		try {
			await logout();
		}
		catch (e) {
			console.warn('Logout API failed, possibly offline', e);
		}
		finally {
			await clearLocalData(queryClient);
			window.location.href = '/login';
		}
	};

	return {
		pin,
		error,
		isLoading,
		handleChange,
		handleComplete,
		handleLogout,
	};
}
