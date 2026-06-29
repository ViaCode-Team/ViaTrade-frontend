import type { RouteObject } from 'react-router';

import { ROUTES } from '@/shared/model';

export const unauthorizedRoutes: RouteObject[] = [
	{
		lazy: () => import('@/app/layouts/auth-layout'),
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
