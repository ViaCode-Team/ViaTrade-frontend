import type { RouteObject } from 'react-router';

import { AuthLayout } from '@/app/layouts/auth-layout';
import { ROUTES } from '@/shared/model';

export const unauthorizedRoutes: RouteObject[] = [
	{
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.LOGIN,
				lazy: () => import('@/pages/login'),
			},
			{
				path: ROUTES.REGISTER,
				lazy: () => import('@/pages/register'),
			},
		],
	},
];
