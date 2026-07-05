import {
	Navigate,
	Outlet,
	type To,
} from 'react-router';

type LocalAuthBlockedRouteProps = {
	isPrivate: boolean;
	guestRedirectTo: To;
	from: unknown;
};

export function LocalAuthBlockedRoute({
	isPrivate,
	guestRedirectTo,
	from,
}: LocalAuthBlockedRouteProps) {
	if (isPrivate) {
		return <Navigate replace to={guestRedirectTo} state={{ from }} />;
	}

	return <Outlet />;
}
