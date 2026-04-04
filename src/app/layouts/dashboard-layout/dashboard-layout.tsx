import { Container, Group, Stack } from '@mantine/core';
import { type ReactNode, useState } from 'react';
import { Outlet } from 'react-router';

import { AppHeader } from '@/widgets/header/ui/header';
import { SideBar } from '@/widgets/side-bar';

type DashboardLayoutProps = { children?: ReactNode };

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleCollapse = (isExpanded: boolean) => {
		setIsCollapsed(isExpanded);
	};

	return (
		<Stack gap={0}>
			<AppHeader isMenuOpen={isCollapsed} onToggleMenu={toggleCollapse} />

			<Group gap={0} align='flex-start' wrap='nowrap'>
				<SideBar isCollapsed={isCollapsed} />

				<Container size='xl' component='main' style={{ flex: 1 }}>
					{children ?? <Outlet />}
				</Container>
			</Group>
		</Stack>
	);
}
