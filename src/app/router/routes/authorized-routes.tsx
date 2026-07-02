import type { RouteObject } from 'react-router';

import { ROUTES } from '@/shared/model';

export const authorizedRoutes: RouteObject[] = [
	{
		lazy: () => import('@/app/layouts/dashboard-layout'),
		children: [
			{
				path: ROUTES.DASHBOARD,
				lazy: () => import('@/pages/dashboard'),
			},
			{
				path: ROUTES.SIGNALS,
				lazy: () => import('@/pages/signals'),
			},
			{
				path: ROUTES.STOCKS,
				lazy: () => import('@/pages/stocks'),
			},
			{
				path: ROUTES.STOCK,
				lazy: () => import('@/pages/stock'),
			},
			{
				path: ROUTES.PROFILE,
				lazy: () => import('@/pages/profile'),
			},
			{
				path: ROUTES.STRATEGIES,
				lazy: () => import('@/pages/strategies'),
			},
			{
				path: ROUTES.STRATEGY,
				lazy: () => import('@/pages/strategy'),
			},
			{
				path: ROUTES.NOTES,
				lazy: () => import('@/pages/notes'),
			},
			{
				path: ROUTES.REMINDERS,
				lazy: () => import('@/pages/reminds'),
			},
			{
				path: ROUTES.STATISTICS,
				lazy: () => import('@/pages/statistics'),
			},
			{
				path: ROUTES.TRADES,
				lazy: () => import('@/pages/trades'),
			},
		],
	},
];
