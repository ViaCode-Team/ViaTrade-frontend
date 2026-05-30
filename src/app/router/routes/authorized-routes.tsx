import type { RouteObject } from 'react-router';

import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { ROUTES } from '@/shared/model/routes';

export const authorizedRoutes: RouteObject[] = [
	{
		element: <DashboardLayout />,
		children: [
			{
				path: ROUTES.HOME,
				lazy: () => import('@/pages/dashboard-page'),
			},
			{
				path: ROUTES.SIGNALS,
				lazy: () => import('@/pages/signals-page'),
			},
			{
				path: ROUTES.STOCKS,
				lazy: () => import('@/pages/stocks-page'),
			},
			{
				path: ROUTES.STOCK,
				lazy: () => import('@/pages/stock-page'),
			},
			{
				path: ROUTES.PROFILE,
				lazy: () => import('@/pages/profile-page'),
			},
			{
				path: ROUTES.STRATEGIES,
				lazy: () => import('@/pages/strategies-page'),
			},
			{
				path: ROUTES.STRATEGY,
				lazy: () => import('@/pages/strategy-page'),
			},
			{
				path: ROUTES.NOTES,
				lazy: () => import('@/pages/notes-page'),
			},
			{
				path: ROUTES.REMINDERS,
				lazy: () => import('@/pages/reminds-page'),
			},
			{
				path: ROUTES.STATISTICS,
				lazy: () => import('@/pages/statistics-page'),
			},
		],
	},
];
