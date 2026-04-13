import type { ReactNode } from 'react';

import { Outlet } from 'react-router';

import { AppNavigationProgress } from './app-navigation-progress';

type MainLayoutProps = { children?: ReactNode };

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<>
			<AppNavigationProgress />
			{children ?? <Outlet />}
		</>
	);
}
