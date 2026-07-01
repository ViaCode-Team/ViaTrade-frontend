import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { useLogout, useLogoutAll } from '@/entities/auth';
import { useSecurity } from '@/entities/security';
import { clearLocalData } from '@/shared/lib/auth';
import { useAppNetwork } from '@/shared/lib/hooks';
import { showNoNetworkNotification } from '@/shared/lib/no-network';
import { ROUTES } from '@/shared/model';

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
	const queryClient = useQueryClient();

	const onLogoutSuccess = async () => {
		await clearLocalData(queryClient);
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	};

	const { mutate: logoutAll, isPending: isLoggingOutAll } = useLogoutAll({
		skipInvalidation: true,
		mutation: { onSuccess: onLogoutSuccess },
	});
	const { mutate: logoutCurrent } = useLogout({
		skipInvalidation: true,
		mutation: { onSuccess: onLogoutSuccess },
	});

	const { isOnline } = useAppNetwork();

	const requestLogoutAll = () => {
		if (!isOnline) {
			showNoNetworkNotification();
			return;
		}

		openLogoutConfirmation({
			title: 'Выйти из всех сессий?',
			description: 'После подтверждения все активные сессии будут завершены, и потребуется войти заново.',
			confirmLabel: 'Выйти',
			onConfirm: logoutAll,
		});
	};

	const requestLogoutCurrentSession = () => {
		if (!isOnline) {
			showNoNetworkNotification();
			return;
		}

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
