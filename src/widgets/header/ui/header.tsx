import { Group } from '@mantine/core';

import { Logo } from '@/shared/ui/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

import { AppBar } from './app-bar';
import classes from './Header.module.css';
import { MenuButton } from './menu-button';

type AppHeaderProps = {
	title?: string;
	isMenuOpen: boolean;
	onToggleMenu: (open: boolean) => void;
};

export function AppHeader({
	title,
	isMenuOpen,
	onToggleMenu,
}: AppHeaderProps) {
	const toggleMenuHandle = () => {
		onToggleMenu(!isMenuOpen);
	};

	return (
		<AppBar>
			<div className={classes.toolbar}>
				<Group gap='sm'>
					<Group gap='xs'>
						<MenuButton
							isExpanded={isMenuOpen}
							onToggle={toggleMenuHandle}
						/>
					</Group>

					<Logo logoWidth={32} logoHeight={32} />
				</Group>

				{title && <h1 className={classes.title}>{title}</h1>}

				<Group gap='sm' ml='auto'>
					<ThemeSwitcher />
				</Group>
			</div>
		</AppBar>
	);
}
