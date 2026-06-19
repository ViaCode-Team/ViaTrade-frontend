import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { get, set } from 'idb-keyval';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useLogout } from '@/entities/auth';
import { useSecurity } from '@/entities/security';
import { clearLocalData } from '@/shared/lib/auth';
import { useAppNetwork } from '@/shared/lib/hooks';
import { showNoNetworkNotification } from '@/shared/lib/no-network';
import {
	FAILED_ATTEMPTS_KEY,
	MAX_FAILED_ATTEMPTS,
	unlockApp,
} from '@/shared/lib/secure-storage';
import { ROUTES } from '@/shared/model';

export function usePinUnlock() {
	const queryClient = useQueryClient();
	const [pin, setPin] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
	const { checkSecurityState } = useSecurity();
	const { isOnline } = useAppNetwork();

	const navigate = useNavigate();
	const onLogoutSuccess = async () => {
		await clearLocalData(queryClient);
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	};

	const { mutate: logout, isPending: isLoggingOut } = useLogout({ mutation: { onSuccess: onLogoutSuccess } });

	const handleComplete = async (value: string) => {
		setError(null);
		startLoading();

		try {
			const currentAttempts = await get<number>(FAILED_ATTEMPTS_KEY);

			// Защита: если ключа попыток нет вообще, значит его удалили вручную в IDB для обхода лимита
			if (currentAttempts === undefined) {
				logout();
				await clearLocalData(queryClient);
				navigate(ROUTES.LOGIN);
				return;
			}

			const success = await unlockApp(value);
			if (success) {
				await set(FAILED_ATTEMPTS_KEY, 0);
				await checkSecurityState();
			}
			else {
				const newAttempts = currentAttempts + 1;
				await set(FAILED_ATTEMPTS_KEY, newAttempts);
				setPin('');

				if (newAttempts >= MAX_FAILED_ATTEMPTS) {
					logout();

					await clearLocalData(queryClient);
					navigate(ROUTES.LOGIN);
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
		if (!isOnline) {
			showNoNetworkNotification();
			return;
		}

		logout();
	};

	return {
		pin,
		error,
		isLoading: isLoading || isLoggingOut,
		handleChange,
		handleComplete,
		handleLogout,
	};
}
