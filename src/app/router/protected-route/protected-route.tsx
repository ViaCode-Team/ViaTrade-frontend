import { useIsRestoring, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { lazily } from 'react-lazily';
import {
	Navigate,
	Outlet,
	type To,
	useLocation,
	useNavigate,
} from 'react-router';

import { useLogout } from '@/entities/auth';
import { useSecurity } from '@/entities/security';
import { useGetMe } from '@/entities/user';
import { clearLocalData } from '@/shared/lib/auth';
import { useAppNetwork } from '@/shared/lib/hooks';
import { ROUTES } from '@/shared/model';
import { GlobalLoader } from '@/shared/ui/global-loader';

const { PinSetup } = lazily(() => import('@/features/security/pin-setup'));
const { PinUnlock } = lazily(() => import('@/features/security/pin-unlock'));

export type ProtectedRouteProps = {
	isPrivate?: boolean;
	guestRedirectTo?: To;
	authRedirectTo?: To;
};

export function ProtectedRoute({
	isPrivate = false,
	guestRedirectTo = ROUTES.LOGIN,
	authRedirectTo = ROUTES.DASHBOARD,
}: ProtectedRouteProps) {
	const location = useLocation();
	const isRestoring = useIsRestoring();
	const { hasPin, isLocked, isReady, isPinSetupMark } = useSecurity();
	const { isOnline } = useAppNetwork();

	const isCanFetch = isReady && (!hasPin || !isLocked) && !isRestoring;

	const { data, isPending } = useGetMe({
		query: {
			enabled: isCanFetch,
		},
	});

	if (!isReady || isRestoring)
		return <GlobalLoader />;

	// Если приложение заблокировано (есть ПИН и он не введен),
	// мы не можем прочитать кэш пользователя, поэтому показываем разблокировку до всех проверок.
	if (hasPin && isLocked) {
		return <PinUnlock />;
	}

	const isAuthChecked = !isPending;
	const user = data?.data;
	const isExistUser = Boolean(user);

	// Пока идёт чекаут пользователя, показываем прелоадер
	if (!isAuthChecked)
		return <GlobalLoader />;

	// Если пользователь авторизован, проверяем PIN
	if (isExistUser && !hasPin) {
		if (isPinSetupMark) {
			return <PinSetup />;
		}

		if (isOnline) {
			return <ForceLogout />;
		}

		return <GlobalLoader />;
	}

	// Если маршрут для авторизованного пользователя(приватный), но пользователь неавторизован, то делаем редирект
	if (isPrivate && !isExistUser)
		return <Navigate replace to={guestRedirectTo} state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL

	// Если маршрут для НЕавторизованного пользователя (НЕ приватный), но пользователь авторизован
	if (!isPrivate && isExistUser) {
		return (
			<Navigate
				replace
				to={location.state?.from || { pathname: authRedirectTo }}
			/>
		);
	}

	return <Outlet />;
}

function ForceLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { checkSecurityState } = useSecurity();

	const onLogoutSuccess = async () => {
		await clearLocalData(queryClient);
		await checkSecurityState();
		navigate(ROUTES.LOGIN);
	};

	const { mutate: logout } = useLogout({ mutation: { onSuccess: onLogoutSuccess } });

	useEffect(() => {
		logout();
	}, [logout]);

	return <GlobalLoader />;
}
