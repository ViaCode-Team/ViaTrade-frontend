import { Container, Group, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { type ReactNode, useState } from 'react';
import { Outlet } from 'react-router';

import { AppHeader } from '@/widgets/header';
import { SideBar } from '@/widgets/side-bar';

import cls from './dashboard-layout.module.css';

type DashboardLayoutProps = { children?: ReactNode };

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const isMobile = useMediaQuery('(max-width: 48em)') ?? false;

	const toggleCollapse = (isExpanded: boolean) => {
		setIsCollapsed(isExpanded);
	};

	const closeSidebar = () => setIsCollapsed(false);

	return (
		<Stack gap={0}>
			<AppHeader isMenuOpen={isCollapsed} onToggleMenu={toggleCollapse} />

			<Group gap={0} align='flex-start' wrap='nowrap'>
				<SideBar
					isCollapsed={isMobile ? false : isCollapsed}
					mobileOpen={isMobile ? isCollapsed : undefined}
					onClose={closeSidebar}
				/>

				<Container size='xl' component='main' className={cls.main}>
					{children ?? <Outlet />}
				</Container>
			</Group>
		</Stack>
	);
}
