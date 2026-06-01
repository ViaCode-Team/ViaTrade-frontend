import { useIsRestoring } from '@tanstack/react-query';
import {
	Navigate,
	Outlet,
	type To,
	useLocation,
} from 'react-router';

import { useSecurity } from '@/entities/security';
import { useGetMe } from '@/entities/user';
import { PinSetup } from '@/features/security/pin-setup';
import { PinUnlock } from '@/features/security/pin-unlock';
import { ROUTES } from '@/shared/model/routes';
import { GlobalLoader } from '@/shared/ui/global-loader';

export type ProtectedRouteProps = {
	isPrivate?: boolean;
	guestRedirectTo?: To;
	authRedirectTo?: To;
};

export function ProtectedRoute({
	isPrivate = false,
	guestRedirectTo = ROUTES.LOGIN,
	authRedirectTo = ROUTES.HOME,
}: ProtectedRouteProps) {
	const location = useLocation();
	const isRestoring = useIsRestoring();
	const { hasPin, isLocked, isReady } = useSecurity();

	const isCanFetch = isReady && (!hasPin || !isLocked) && !isRestoring;

	const { data, isPending } = useGetMe({
		query: {
			enabled: isCanFetch,
			refetchInterval: 60000,
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
		return <PinSetup />;
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
