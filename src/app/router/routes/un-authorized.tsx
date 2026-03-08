import type { RouteObject } from 'react-router';

import { AuthLayout } from '@/app/layouts/auth-layout';
import { LoginPageLazy } from '@/pages/login-page';
import { RegisterPageLazy } from '@/pages/register-page';
import { ROUTES } from '@/shared/model/routes';

export const UnAuthorizedRoutes: RouteObject[] = [
	{
		element: <AuthLayout />,
		children: [
			{
				path: ROUTES.LOGIN,
				element: <LoginPageLazy />,
			},
			{
				path: ROUTES.REGISTER,
				element: <RegisterPageLazy />,
			},
		],
	},
];
