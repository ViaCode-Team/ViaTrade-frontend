import type { RouteObject } from 'react-router';

import { AuthLayout } from '@/app/layouts/auth-layout';
import { ROUTES } from '@/shared/model/routes';

export const UnAuthorizedRoutes: RouteObject[] = [
	{
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.LOGIN,
				lazy: async () => {
					const module = await import('@/pages/login-page/login-page');
					return {
						Component: module.default,
					};
				},
			},
			{
				path: ROUTES.REGISTER,

				lazy: async () => {
					const module = await import('@/pages/register-page/register-page');
					return {
						Component: module.default,
					};
				},
			},
		],
	},
];
