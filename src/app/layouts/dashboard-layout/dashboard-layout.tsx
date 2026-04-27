import type { ReactNode } from 'react';

import { AppShell, Container, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router';

import { useLockDocumentScroll } from '@/shared/lib/use-lock-document-scroll';
import { AppHeader } from '@/widgets/header';
import { SideBar } from '@/widgets/side-bar';

import cls from './dashboard-layout.module.css';

type DashboardLayoutProps = { children?: ReactNode };

const DESKTOP_SIDEBAR_EXPANDED_WIDTH = 216;
const DESKTOP_SIDEBAR_COLLAPSED_WIDTH = 52;
const NAVBAR_BREAKPOINT = 'xs' as const;

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const theme = useMantineTheme();
	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints[NAVBAR_BREAKPOINT]})`);

	const [mobileOpened, mobileHandlers] = useDisclosure(false);
	const [desktopExpanded, desktopHandlers] = useDisclosure(true);

	useLockDocumentScroll(isDesktop === false && mobileOpened);

	return (
		<AppShell
			header={{ height: 55 }}
			navbar={{
				width: desktopExpanded
					? DESKTOP_SIDEBAR_EXPANDED_WIDTH
					: DESKTOP_SIDEBAR_COLLAPSED_WIDTH,
				breakpoint: NAVBAR_BREAKPOINT,
				collapsed: { mobile: !mobileOpened },
			}}
			padding={{ base: 'xs', xs: 'sm', sm: 'md' }}
			transitionDuration={220}
			transitionTimingFunction='ease'
		>
			<AppShell.Header>
				<AppHeader
					isDesktopSidebarExpanded={desktopExpanded}
					isMobileSidebarOpen={mobileOpened}
					onToggleDesktopSidebar={desktopHandlers.toggle}
					onToggleMobileSidebar={mobileHandlers.toggle}
				/>
			</AppShell.Header>

			<AppShell.Navbar className={cls.navbar}>
				<SideBar
					isCollapsed={!desktopExpanded}
					mobileOpen={mobileOpened}
					onClose={mobileHandlers.close}
				/>
			</AppShell.Navbar>

			<AppShell.Main className={cls.main}>
				<Container size='xl' p={0}>
					{children ?? <Outlet />}
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
