import { lazy } from 'react';

export { ErrorPage } from './error-page';

export const ErrorPageLazy = lazy(() => import('./error-page'));
