import type { RouteObject } from 'react-router';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { ROUTES } from '@/shared/model/routes';

export const AuthorizedRoutes: RouteObject[] = [
	{
		element: <DashboardLayout />,
		children: [
			{
				path: ROUTES.HOME,
				lazy: () => import('@/pages/dashboard-page/dashboard-page')
					.then((module) => ({
						Component: module.default,
					})),
			},
			{
				path: ROUTES.SIGNALS,
				lazy: () => import('@/pages/signals-page/signals-page')
					.then((module) => ({
						Component: module.default,
					})),
			},
		],
	},
];
