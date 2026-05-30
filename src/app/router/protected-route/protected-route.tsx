import {
	Navigate,
	Outlet,
	type To,
	useLocation,
} from 'react-router';

import { useGetMe } from '@/entities/user';
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
	const { data, isLoading } = useGetMe();

	const isAuthChecked = !isLoading;
	const user = data?.data;
	const isExistUser = Boolean(user);

	// Пока идёт чекаут пользователя, показываем прелоадер
	if (!isAuthChecked)
		return <GlobalLoader />;

	// Если маршрут для авторизованного пользователя(приватный), но пользователь неавторизован, то делаем редирект
	if (isPrivate && !isExistUser)
		return <Navigate replace to={guestRedirectTo} state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL

	// Если маршрут для НЕавторизованного пользователя (НЕ приватный), но пользователь авторизован
	if (!isPrivate && isExistUser) {
		// При обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
		// В случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
		// Мы сами создаём объект с указанием адреса и делаем переадресацию на главную страницу
		return (
			<Navigate
				replace
				to={location.state?.from || { pathname: authRedirectTo }}
			/>
		);
	}

	return <Outlet />;
}
