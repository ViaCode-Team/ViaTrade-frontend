import { createBrowserRouter } from 'react-router';

import { ErrorPage } from '@/pages/error-page/error-page';
import { GlobalLoader } from '@/shared/ui/global-loader';

import { MainLayout } from '../layouts/main-layout';
import { ProtectedRoute } from './protected-route';
import { AuthorizedRoutes, UnAuthorizedRoutes } from './routes';

export const router = createBrowserRouter([
	{
		element: <MainLayout />,

		// Глобальные ошибки, НЕ роута (500)
		errorElement: (
			<MainLayout>
				<ErrorPage statusCode={500} />
			</MainLayout>
		),

		hydrateFallbackElement: <GlobalLoader />,

		children: [
			//* Защищённые пути

			// Только для авторизованных
			{
				element: <ProtectedRoute isPrivate />,
				children: [...AuthorizedRoutes],
			},

			// Только для НЕавторизованных
			{
				element: <ProtectedRoute />,
				children: [...UnAuthorizedRoutes],
			},

			// Ошибки роута (404)
			{
				path: '*',
				lazy: () => import('@/pages/error-page'),
			},
		],
	},
]);
