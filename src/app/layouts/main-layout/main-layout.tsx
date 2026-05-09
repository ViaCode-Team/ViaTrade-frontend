import type { ReactNode } from 'react';

import { ModalsProvider } from '@mantine/modals';
import { Outlet } from 'react-router';

import { AppNavigationProgress } from './app-navigation-progress';

type MainLayoutProps = { children?: ReactNode };

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<ModalsProvider>
			<AppNavigationProgress />
			{children ?? <Outlet />}
		</ModalsProvider>
	);
}
