import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import { onlineManager, useQueryClient } from '@tanstack/react-query';
import { createElement } from 'react';
import { useNavigate } from 'react-router';

import { useSecurity } from '@/entities/security';
import { clearLocalData } from '@/shared/lib/auth';
import { useAppNetwork } from '@/shared/lib/hooks';
import { showNoNetworkNotification } from '@/shared/lib/no-network';
import { ROUTES } from '@/shared/model';

type LogoutConfirmationContent = {
	title: string;
	description: string;
	confirmLabel: string;
};

function openLogoutConfirmation({
	title,
	description,
	confirmLabel,
	onConfirm,
}: LogoutConfirmationContent & { onConfirm: () => void }) {
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

function showLogoutErrorNotification() {
	notifications.show({
		title: 'Не удалось выйти',
		message: 'Не удалось выйти из аккаунта.',
		color: 'red',
		icon: createElement(IconAlertCircle, { size: 18 }),
	});
}

export function useSessionLogoutFlow() {
	const navigate = useNavigate();
	const { checkSecurityState } = useSecurity();
	const queryClient = useQueryClient();
	const { isOnline, networkState } = useAppNetwork();

	const handleLogoutSuccess = async () => {
		await clearLocalData(queryClient);
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	};

	const canRequestLogout = () => isOnline && networkState.online && onlineManager.isOnline() && navigator.onLine;

	const requestLogout = (content: LogoutConfirmationContent, logout: () => void) => {
		if (!canRequestLogout()) {
			showNoNetworkNotification();
			return;
		}

		openLogoutConfirmation({
			...content,
			onConfirm: () => {
				if (!canRequestLogout()) {
					showNoNetworkNotification();
					return;
				}

				logout();
			},
		});
	};

	return {
		mutationOptions: {
			networkMode: 'online',
			onSuccess: handleLogoutSuccess,
			onError: showLogoutErrorNotification,
		} as const,
		requestLogout,
	};
}
