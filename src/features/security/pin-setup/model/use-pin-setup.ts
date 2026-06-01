import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { logout } from '@/entities/auth/api/gen';
import { useSecurity } from '@/entities/security';
import { clearLocalData } from '@/shared/lib/auth/clear-local-data';
import { setupPin } from '@/shared/lib/secure-storage';

export function usePinSetup() {
	const [step, setStep] = useState<1 | 2>(1);
	const [pin, setPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
	const { checkSecurityState } = useSecurity();
	const queryClient = useQueryClient();

	const handlePinChange = (value: string) => {
		setPin(value);
		if (error)
			setError(null);
	};

	const handleConfirmPinChange = (value: string) => {
		setConfirmPin(value);
		if (error)
			setError(null);
	};

	const handleStep1Complete = () => {
		setError(null);
		setStep(2);
		setConfirmPin('');
	};

	const handleStep2Complete = async (value: string) => {
		setError(null);

		if (pin !== value) {
			setError('ПИН-коды не совпадают.');
			setConfirmPin('');
			return;
		}

		startLoading();
		try {
			await setupPin(pin);
			await checkSecurityState();
			// Refetch to ensure the cache is saved to the newly created secure storage
			await queryClient.refetchQueries();
		}
		catch {
			setError('Не удалось создать ПИН-код. Попробуйте еще раз.');
			setConfirmPin('');
		}
		finally {
			stopLoading();
		}
	};

	const goBack = () => {
		setStep(1);
		setPin('');
		setConfirmPin('');
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
		step,
		pin,
		confirmPin,
		error,
		isLoading,
		handlePinChange,
		handleConfirmPinChange,
		handleStep1Complete,
		handleStep2Complete,
		goBack,
		handleLogout,
	};
}
