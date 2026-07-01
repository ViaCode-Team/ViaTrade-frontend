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

import { useSecurity } from '@/entities/security';
import { useGetMe } from '@/entities/user';
import { clearLocalData } from '@/shared/lib/auth';
import { setLocalAuthBlocked } from '@/shared/lib/secure-storage';
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
	const {
		hasPin,
		isLocked,
		isReady,
		isPinSetupMark,
		isLocalAuthBlocked,
	} = useSecurity();

	const isCanFetch = isReady && !isLocalAuthBlocked && (!hasPin || !isLocked) && !isRestoring;

	const { data, isPending } = useGetMe({
		query: {
			enabled: isCanFetch,
		},
	});

	if (!isReady || isRestoring)
		return <GlobalLoader />;

	if (isLocalAuthBlocked) {
		if (isPrivate) {
			return <Navigate replace to={guestRedirectTo} state={{ from: location }} />;
		}

		return <Outlet />;
	}

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

		return <LocalAuthBlock />;
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

function LocalAuthBlock() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { checkSecurityState } = useSecurity();

	useEffect(() => {
		const block = async () => {
			await clearLocalData(queryClient);
			await setLocalAuthBlocked();
			await checkSecurityState();
			navigate(ROUTES.LOGIN);
		};

		void block();
	}, [queryClient, checkSecurityState, navigate]);

	return <GlobalLoader />;
}
