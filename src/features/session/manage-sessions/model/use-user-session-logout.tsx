import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useNavigate } from 'react-router';

import { useLogout, useLogoutAll } from '@/entities/auth';
import { useSecurity } from '@/entities/security';
import { idbClear } from '@/shared/lib/idb';
import { lockApp } from '@/shared/lib/secure-storage';
import { ROUTES } from '@/shared/model/routes';

type LogoutConfirmationContent = {
	title: string;
	description: string;
	confirmLabel: string;
	onConfirm: () => void;
};

function openLogoutConfirmation({
	title,
	description,
	confirmLabel,
	onConfirm,
}: LogoutConfirmationContent) {
	modals.openConfirmModal({
		title,
		centered: true,
		children: (
			<Text size='sm' c='dimmed'>
				{description}
			</Text>
		),
		labels: {
			cancel: 'Отмена',
			confirm: confirmLabel,
		},
		confirmProps: {
			color: 'red',
		},
		withCloseButton: false,
		onConfirm,
	});
}

export function useUserSessionLogout() {
	const navigate = useNavigate();
	const { checkSecurityState } = useSecurity();

	const onLogoutSuccess = async () => {
		lockApp();
		await idbClear();
		localStorage.clear();
		sessionStorage.clear();
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	};

	const { mutate: logoutAll, isPending: isLoggingOutAll } = useLogoutAll({
		mutation: { onSuccess: onLogoutSuccess },
	});
	const { mutate: logoutCurrent } = useLogout({
		mutation: { onSuccess: onLogoutSuccess },
	});

	const requestLogoutAll = () => openLogoutConfirmation({
		title: 'Выйти из всех сессий?',
		description: 'После подтверждения все активные сессии будут завершены, и потребуется войти заново.',
		confirmLabel: 'Выйти',
		onConfirm: logoutAll,
	});

	const requestLogoutCurrentSession = () => {
		openLogoutConfirmation({
			title: 'Выйти из текущей сессии?',
			description: 'После подтверждения текущая сессия будет завершена, и потребуется войти заново.',
			confirmLabel: 'Выйти',
			onConfirm: logoutCurrent,
		});
		// TODO: per-session revoke when API endpoint is available
	};

	return {
		isLoggingOutAll,
		requestLogoutAll,
		requestLogoutCurrentSession,
	};
}
