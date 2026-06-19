import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useLogout } from '@/entities/auth';
import { useSecurity } from '@/entities/security';
import { clearLocalData } from '@/shared/lib/auth';
import { useAppNetwork } from '@/shared/lib/hooks';
import { showNoNetworkNotification } from '@/shared/lib/no-network';
import { clearPinSetupMark, hasPinSetupMark, setupPin } from '@/shared/lib/secure-storage';
import { ROUTES } from '@/shared/model';

export function usePinSetup() {
	const [step, setStep] = useState<1 | 2>(1);
	const [pin, setPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, { open: startLoading, close: stopLoading }] = useDisclosure(false);
	const { checkSecurityState } = useSecurity();
	const queryClient = useQueryClient();

	const { isOnline } = useAppNetwork();
	const navigate = useNavigate();

	const onLogoutSuccess = async () => {
		await clearLocalData(queryClient);
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	};

	const { mutate: logout, isPending: isLoggingOut } = useLogout({ mutation: { onSuccess: onLogoutSuccess } });

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
		if (!isOnline) {
			showNoNetworkNotification();
			return;
		}

		const hasMark = await hasPinSetupMark();
		if (!hasMark) {
			logout();
			await clearLocalData(queryClient);
			navigate(ROUTES.LOGIN);
			return;
		}

		setError(null);
		setStep(2);
		setConfirmPin('');
	};

	const handleStep2Complete = async (value: string) => {
		setError(null);

		if (!isOnline) {
			showNoNetworkNotification();
			setConfirmPin('');
			return;
		}

		const hasMark = await hasPinSetupMark();
		if (!hasMark) {
			logout();
			await clearLocalData(queryClient);
			navigate(ROUTES.LOGIN);
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
		if (!isOnline) {
			showNoNetworkNotification();
			return;
		}

		logout();
	};

	return {
		step,
		pin,
		confirmPin,
		error,
		isLoading: isLoading || isLoggingOut,
		handlePinChange,
		handleConfirmPinChange,
		handleStep1Complete,
		handleStep2Complete,
		goBack,
		handleLogout,
	};
}
