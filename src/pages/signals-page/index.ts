import { lazy } from 'react';

export { SignalsPage } from './signals-page';

export const SignalsPageLazy = lazy(() => import('./signals-page'));
