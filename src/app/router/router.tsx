import { createBrowserRouter } from 'react-router';

import { ErrorPage } from '@/pages/error';
import { ROUTES } from '@/shared/model';
import { GlobalLoader } from '@/shared/ui/global-loader';

import { MainLayout } from '../layouts/main-layout';
import { ProtectedRoute } from './protected-route';
import { authorizedRoutes, unauthorizedRoutes } from './routes';

export const router = createBrowserRouter([
	{
		element: <MainLayout />,

		// Глобальные ошибки
		errorElement: (
			<MainLayout>
				<ErrorPage />
			</MainLayout>
		),

		hydrateFallbackElement: <GlobalLoader />,

		children: [
			//* Защищённые пути
			// Общедоступные пути (Landing)
			{
				path: ROUTES.LANDING,
				lazy: () => import('@/pages/landing'),
			},


			// Только для авторизованных
			{
				element: <ProtectedRoute isPrivate />,
				children: [...authorizedRoutes],
			},

			// Только для НЕавторизованных
			{
				element: <ProtectedRoute />,
				children: [...unauthorizedRoutes],
			},

			// Ошибки роута (404)
			{
				path: '*',
				element: <ErrorPage />,
			},
		],
	},
]);
