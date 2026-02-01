import type { ReactNode } from 'react';
import { Outlet } from 'react-router';

type MainLayoutProps = { children?: ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
	return <main>{children ?? <Outlet />}</main>;
};
