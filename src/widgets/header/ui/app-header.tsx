import { Flex, Group } from '@mantine/core';

import { Logo } from '@/shared/ui/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

import { AddTradeButton } from './add-trade-button/add-trade-button';
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
				<MenuButton
					isDesktopExpanded={isDesktopSidebarExpanded}
					isMobileOpen={isMobileSidebarOpen}
					onDesktopToggle={onToggleDesktopSidebar}
					onMobileToggle={onToggleMobileSidebar}
				/>

				<Logo />
			</Group>

			<Group gap='sm'>
				<ThemeSwitcher />

				<AddTradeButton />
			</Group>
		</Flex>
	);
}
