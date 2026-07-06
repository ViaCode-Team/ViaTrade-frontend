import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useSecurity } from '@/entities/security';
import { clearPinSetupMark, hasPinSetupMark, setupPin } from '@/shared/lib/secure-storage';

type UsePinSetupParams = {
	onLocalAuthBlockRequired: () => Promise<void> | void;
};

export function usePinSetup({ onLocalAuthBlockRequired }: UsePinSetupParams) {
	const [step, setStep] = useState<1 | 2>(1);
	const [pin, setPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
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

	const handleStep1Complete = async () => {
		const hasMark = await hasPinSetupMark();
		if (!hasMark) {
			await onLocalAuthBlockRequired();
			return;
		}

		setError(null);
		setStep(2);
		setConfirmPin('');
	};

	const handleStep2Complete = async (value: string) => {
		setError(null);

		const hasMark = await hasPinSetupMark();
		if (!hasMark) {
			await onLocalAuthBlockRequired();
			return;
		}

		if (pin !== value) {
			setError('ПИН-коды не совпадают.');
			setConfirmPin('');
			return;
		}

		startLoading();
		try {
			await setupPin(pin);
			await clearPinSetupMark();
			await checkSecurityState();
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
