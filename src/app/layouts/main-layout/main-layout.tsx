import type { ReactNode } from 'react';

import { Outlet } from 'react-router';

type MainLayoutProps = { children?: ReactNode };

export function MainLayout({ children }: MainLayoutProps) {
	return <>{children ?? <Outlet />}</>;
}
