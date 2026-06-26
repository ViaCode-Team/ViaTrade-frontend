import type { ReactNode } from 'react';

import {
	AppShell,
	Container,
	Flex,
} from '@mantine/core';
import { Outlet } from 'react-router';

import {
	APP_SHELL_PADDING,
	PAGE_CONTAINER_SIZE,
	PAGE_STACK_GAP,
} from '@/shared/model';
import { AppHeader } from '@/widgets/header';
import { OfflineBanner } from '@/widgets/offline-banner';
import { SideBar } from '@/widgets/side-bar';

import cls from './dashboard-layout.module.css';
import { useDashboardSidebar } from './use-dashboard-sidebar';

type DashboardLayoutProps = { children?: ReactNode };

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const sidebar = useDashboardSidebar();

	return (
		<AppShell
			header={{ height: 55 }}
			navbar={sidebar.navbar}
			padding={APP_SHELL_PADDING}
			transitionDuration={240}
			transitionTimingFunction='cubic-bezier(0.2, 0, 0, 1)'
		>
			<AppShell.Header>
				<AppHeader
					isDesktopSidebarExpanded={sidebar.isDesktopExpanded}
					isMobileSidebarOpen={sidebar.isMobileOpen}
					onToggleDesktopSidebar={sidebar.toggleDesktopSidebar}
					onToggleMobileSidebar={sidebar.toggleMobileSidebar}
				/>

			</AppShell.Header>

			<AppShell.Navbar className={cls.navbar}>
				<SideBar
					isCollapsed={!sidebar.isDesktopExpanded}
					mobileOpen={sidebar.isMobileOpen}
					onClose={sidebar.closeMobileSidebar}
				/>
			</AppShell.Navbar>

			<AppShell.Main>
				<OfflineBanner />

				<Container size={PAGE_CONTAINER_SIZE} p={0}>
					<Flex direction='column' gap={PAGE_STACK_GAP}>
						{children ?? <Outlet />}
					</Flex>
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
