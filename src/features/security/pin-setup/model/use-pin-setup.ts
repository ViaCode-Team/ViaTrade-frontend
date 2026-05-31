import { useState } from 'react';

import { queryClient } from '@/app/query-client';
import { useSecurity } from '@/entities/security';
import { setupPin } from '@/shared/lib/secure-storage';

export function usePinSetup() {
	const [step, setStep] = useState<1 | 2>(1);
	const [pin, setPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { checkSecurityState } = useSecurity();

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

		setIsLoading(true);
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
			setIsLoading(false);
		}
	};

	const goBack = () => {
		setStep(1);
		setPin('');
		setConfirmPin('');
		setError(null);
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
	};
}
