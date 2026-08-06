import { useIsRestoring } from '@tanstack/react-query';
import { lazily } from 'react-lazily';
import {
	Navigate,
	Outlet,
	type To,
	useLocation,
} from 'react-router';

import { useSecurity } from '@/entities/security';
import { LogoutCurrentSessionButton, useCurrentSessionLogout } from '@/features/auth/logout';
import { useCurrentUserQueryControl } from '@/shared/lib/auth';
import { ROUTES } from '@/shared/model';
import { GlobalLoader } from '@/shared/ui/global-loader';

import {
	LocalAuthBlock,
	LocalAuthBlockedRoute,
} from '../../security/local-auth-block';
import { useProtectedRouteUser } from './use-protected-route-user';

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
	const {
		hasPin,
		isLocked,
		isReady,
		isPinSetupMark,
		isLocalAuthBlocked,
	} = useSecurity();

	const handleLocalAuthBlockRequired = useCurrentSessionLogout();
	const { isCurrentUserQueryEnabled } = useCurrentUserQueryControl();

	const { isAuthChecked, isUserAuthenticated } = useProtectedRouteUser({
		isReady,
		isRestoring,
		isLocalAuthBlocked,
		hasPin,
		isLocked,
		isCurrentUserQueryEnabled,
	});

	if (!isReady || isRestoring)
		return <GlobalLoader />;

	if (isLocalAuthBlocked) {
		return (
			<LocalAuthBlockedRoute
				isPrivate={isPrivate}
				guestRedirectTo={guestRedirectTo}
				from={location}
			/>
		);
	}

	// Если приложение заблокировано (есть ПИН и он не введен),
	// мы не можем прочитать кэш пользователя, поэтому показываем разблокировку до всех проверок.
	if (hasPin && isLocked) {
		return <PinUnlock actionSlot={<LogoutCurrentSessionButton />} />;
	}

	// Пока идёт чекаут пользователя, показываем прелоадер
	if (!isAuthChecked)
		return <GlobalLoader />;

	// Если пользователь авторизован, проверяем PIN
	if (isUserAuthenticated && !hasPin) {
		if (isPinSetupMark) {
			return (
				<PinSetup
					actionSlot={<LogoutCurrentSessionButton />}
					onLocalAuthBlockRequired={handleLocalAuthBlockRequired}
				/>
			);
		}

		return <LocalAuthBlock />;
	}

	// Если маршрут для авторизованного пользователя(приватный), но пользователь неавторизован, то делаем редирект
	if (isPrivate && !isUserAuthenticated)
		return <Navigate replace to={guestRedirectTo} state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL

	// Если маршрут для НЕавторизованного пользователя (НЕ приватный), но пользователь авторизован
	if (!isPrivate && isUserAuthenticated) {
		return (
			<Navigate
				replace
				to={location.state?.from || { pathname: authRedirectTo }}
			/>
		);
	}

	return <Outlet />;
}
