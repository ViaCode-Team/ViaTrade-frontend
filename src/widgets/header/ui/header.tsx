import { Group } from '@mantine/core';

import { Logo } from '@/shared/ui/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

import { AppBar } from './app-bar';
import cls from './header.module.css';
import { MenuButton } from './menu-button';

type AppHeaderProps = {
	isMenuOpen: boolean;
	onToggleMenu: (open: boolean) => void;
};

export function AppHeader({
	isMenuOpen,
	onToggleMenu,
}: AppHeaderProps) {
	const toggleMenuHandle = () => {
		onToggleMenu(!isMenuOpen);
	};

	return (
		<AppBar>
			<div className={cls.toolbar}>
				<Group gap='sm'>
					<Group gap='xs'>
						<MenuButton
							isExpanded={isMenuOpen}
							onToggle={toggleMenuHandle}
						/>
					</Group>

					<Logo logoWidth={32} logoHeight={32} />
				</Group>


				<Group gap='sm' ml='auto'>
					<ThemeSwitcher />
				</Group>
			</div>
		</AppBar>
	);
}
