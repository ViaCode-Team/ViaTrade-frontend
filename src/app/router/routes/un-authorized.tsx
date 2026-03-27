import type { RouteObject } from 'react-router';

import { AuthLayout } from '@/app/layouts/auth-layout';
import { ROUTES } from '@/shared/model/routes';

export const UnAuthorizedRoutes: RouteObject[] = [
	{
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.LOGIN,
				lazy: () => import('@/pages/login-page'),
			},
			{
				path: ROUTES.REGISTER,
				lazy: () => import('@/pages/register-page'),
			},
		],
	},
];
