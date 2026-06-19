import { Flex, Group } from '@mantine/core';

import { AddTradeButton } from '@/features/statistic/add';
import { Logo } from '@/shared/ui/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

import { MenuButton } from './menu-button';

type AppHeaderProps = {
	isDesktopSidebarExpanded: boolean;
	isMobileSidebarOpen: boolean;
	onToggleDesktopSidebar: () => void;
	onToggleMobileSidebar: () => void;
};

export function AppHeader({
	isDesktopSidebarExpanded,
	isMobileSidebarOpen,
	onToggleDesktopSidebar,
	onToggleMobileSidebar,
}: AppHeaderProps) {
	return (
		<Flex justify='space-between' p='xs'>
			<Group gap='sm'>
				<Group gap='xs'>
					<MenuButton
						isDesktopExpanded={isDesktopSidebarExpanded}
						isMobileOpen={isMobileSidebarOpen}
						onDesktopToggle={onToggleDesktopSidebar}
						onMobileToggle={onToggleMobileSidebar}
					/>
				</Group>

				<Logo />
			</Group>
			<Group gap='sm'>
				<ThemeSwitcher />

				<AddTradeButton />
			</Group>
		</Flex>
	);
}
