import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import { onlineManager, useQueryClient } from '@tanstack/react-query';
import { createElement } from 'react';
import { useNavigate } from 'react-router';

import { useSecurity } from '@/entities/security';
import { useDeleteSessions } from '@/entities/session';
import { clearLocalData, useCurrentUserQueryControl } from '@/shared/lib/auth';
import { useAppNetwork } from '@/shared/lib/hooks';
import { showNoNetworkNotification } from '@/shared/lib/no-network';
import { ROUTES } from '@/shared/model';

import { openLogoutConfirmation } from './logout-confirmation';

function showLogoutErrorNotification() {
	notifications.show({
		title: 'Не удалось выйти',
		message: 'Не удалось выйти из аккаунта.',
		color: 'red',
		icon: createElement(IconAlertCircle, { size: 18 }),
	});
}

export function useAllSessionsLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { checkSecurityState } = useSecurity();
	const { resumeCurrentUserQuery, suspendCurrentUserQuery } = useCurrentUserQueryControl();
	const { isOnline, networkState } = useAppNetwork();
	const { mutate: logoutAll, isPending } = useDeleteSessions({
		skipInvalidation: true,
		mutation: {
			networkMode: 'online',
			onSuccess: async () => {
				await clearLocalData(queryClient);
				await checkSecurityState();
				navigate(ROUTES.LOGIN);
			},
			onError: () => {
				resumeCurrentUserQuery();
				showLogoutErrorNotification();
			},
		},
	});

	const canRequestLogout = () => isOnline && networkState.online && onlineManager.isOnline() && navigator.onLine;

	const requestLogoutAll = () => {
		if (!canRequestLogout()) {
			showNoNetworkNotification();
			return;
		}

		openLogoutConfirmation({
			title: 'Выйти из всех сессий?',
			description: 'Все активные сессии будут завершены. Для продолжения работы потребуется войти снова.',
			confirmLabel: 'Выйти',
			onConfirm: () => {
				if (!canRequestLogout()) {
					showNoNetworkNotification();
					return;
				}

				suspendCurrentUserQuery();
				logoutAll();
			},
		});
	};

	return {
		isLoggingOutAll: isPending,
		requestLogoutAll,
	};
}
