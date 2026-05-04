import type { ReactNode } from 'react';

import {
	AppShell,
	Container,
	Flex,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router';

import { useLockDocumentScroll } from '@/shared/lib/use-lock-document-scroll';
import {
	APP_SHELL_PADDING,
	PAGE_CONTAINER_SIZE,
	PAGE_STACK_GAP,
} from '@/shared/model/layout';
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
			padding={APP_SHELL_PADDING}
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

			<AppShell.Main>
				<Container size={PAGE_CONTAINER_SIZE} p={0}>
					<Flex direction='column' gap={PAGE_STACK_GAP}>
						{children ?? <Outlet />}
					</Flex>
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
