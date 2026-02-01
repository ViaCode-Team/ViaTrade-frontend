import { Outlet, type RouteObject } from 'react-router';
import { ROUTES } from '@/shared/model/routes';

export const AuthorizedRoutes: RouteObject[] = [
	{
		element: (
			<div>
				AuthorizedRoutes
				<Outlet />
			</div>
		),
		children: [
			{
				path: ROUTES.HOME,
				element: <div>DASHBOARD</div>,
			},
		],
	},
];
