import type { ReactNode } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { SideBar } from '@/widgets/side-bar';

type MainLayoutProps = { children?: ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div style={{ display: 'flex' }}>
			<SideBar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
			<main>{children ?? <Outlet />}</main>
		</div>
	);
};
