import type { ReactNode } from 'react';
import { Outlet } from 'react-router';

type AuthLayoutProps = { children?: ReactNode };

export const AuthLayout = ({ children }: AuthLayoutProps) => {
	return <div>{children ?? <Outlet />}</div>;
};
