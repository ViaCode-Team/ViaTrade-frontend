import { lazy } from 'react';

export { DashboardPage } from './dashboard-page';

export const DashboardPageLazy = lazy(() => import('./dashboard-page'));
