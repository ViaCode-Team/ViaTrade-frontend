import type { RouteObject } from 'react-router';
import { AuthLayout } from '@/app/layouts/authLayout';
import { LoginPageLazy } from '@/pages/login-page';
import { ROUTES } from '@/shared/model/routes';

export const UnAuthorizedRoutes: RouteObject[] = [
	{
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.LOGIN,
				element: <LoginPageLazy />,
			},
		],
	},
];
