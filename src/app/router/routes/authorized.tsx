import type { RouteObject } from 'react-router';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { DashboardPageLazy } from '@/pages/dashboard-page';
import { ROUTES } from '@/shared/model/routes';

export const AuthorizedRoutes: RouteObject[] = [
	{
		element: <DashboardLayout />,
		children: [
			{
				path: ROUTES.HOME,
				element: <DashboardPageLazy />,
			},
		],
	},
];
