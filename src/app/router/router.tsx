import { CircularProgress } from '@mui/material';
import { createBrowserRouter } from 'react-router';
import { ErrorPageLazy } from '@/pages/error-page';
import { MainLayout } from '../layouts/mainLayout';
import { ProtectedRoute } from './protectedRoute';
import { AuthorizedRoutes, UnAuthorizedRoutes } from './routes';

export const router = createBrowserRouter([
	{
		element: <MainLayout />,

		// Глобальные ошибки, НЕ роута (500)
		errorElement: (
			<MainLayout>
				<ErrorPageLazy statusCode={500} />
			</MainLayout>
		),

		hydrateFallbackElement: <CircularProgress />,

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
				element: <ErrorPageLazy />,
			},
		],
	},
]);
