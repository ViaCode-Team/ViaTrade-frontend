import type { ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';

import { IconAlertTriangle, IconServerOff, IconWifiOff } from '@tabler/icons-react';

import { ApiError, NetworkError } from '@/shared/api/client/errors';
import { isProblemDetails } from '@/shared/api/client/problem-details';
import { useAppNetwork } from '@/shared/lib/hooks';
import { theme } from '@/shared/lib/theme/theme';

import { ErrorAlert } from './error-alert';

type ErrorDetails = {
	title: string;
	description: string;
	icon?: ReactNode;
};

const ERROR_MESSAGES: Record<number | string, ErrorDetails> = {
	offline: {
		title: 'Нет подключения к сети',
		description:
			'Эта страница или функция недоступна без первоначальной загрузки данных. Пожалуйста, проверьте подключение и попробуйте снова.',
		icon: <IconWifiOff color={theme.colors?.yellow?.[6]} />,
	},
	502: {
		title: 'Сервер временно недоступен',
		description: 'В данный момент сервер не отвечает. Возможно, ведутся технические работы. Пожалуйста, попробуйте ещё раз позже.',
		icon: <IconServerOff color={theme.colors?.red?.[6]} />,
	},
	503: {
		title: 'Сервис временно недоступен',
		description: 'Сервер перегружен или находится на обслуживании. Повторите попытку позже.',
		icon: <IconServerOff color={theme.colors?.orange?.[6]} />,
	},
	server: {
		title: 'Ошибка сервера',
		description: 'Произошла ошибка на стороне сервера. Наши специалисты уже работают над ее устранением.',
	},
	default: {
		title: 'Что-то пошло не так',
		description: 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз позже.',
	},
} as const;

function getErrorDetails(error: unknown, isOnline: boolean): ErrorDetails {
	if (!isOnline || error instanceof NetworkError) {
		return ERROR_MESSAGES.offline;
	}

	if (error instanceof ApiError && isProblemDetails(error.details)) {
		const { status } = error.details;
		let errorMessage: ErrorDetails | null = null;

		errorMessage = ERROR_MESSAGES[status];

		if (status >= 500) {
			errorMessage = ERROR_MESSAGES.server;
		}

		if (errorMessage) {
			return errorMessage;
		}
	}

	return ERROR_MESSAGES.default;
}

export function ErrorFallback({
	error,
	resetErrorBoundary,
}: FallbackProps) {
	const { isOnline } = useAppNetwork();

	const { title, description, icon } = getErrorDetails(error, isOnline);

	const handleReload = () => {
		window.location.reload();
	};

	return (
		<ErrorAlert
			icon={icon ?? <IconAlertTriangle color={theme.colors?.red?.[6]} />}
			title={title}
			description={description}
			onReload={handleReload}
			onRetry={resetErrorBoundary}
		/>
	);
}
