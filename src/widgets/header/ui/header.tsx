import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import { Logo } from '@/shared/ui/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

import { AppBar } from './app-bar';
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
		<AppBar
			sx={{
				'& .MuiToolbar-root': { px: 1 },
			}}
			position='sticky'
		>
			<Toolbar>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					sx={{ width: '100%', flexWrap: 'wrap' }}
				>
					<Stack direction='row' gap={1}>
						<Stack direction='row' alignItems='center'>
							<Box>
								<MenuButton
									isExpanded={isMenuOpen}
									onToggle={toggleMenuHandle}
								/>
							</Box>
						</Stack>

						<Stack alignItems='center' justifyContent='center'>
							<Logo logoWidth={32} logoHeight={32} />
						</Stack>
					</Stack>

					{title ?? <Box component='h1'>{title}</Box>}

					<Stack
						direction='row'
						alignItems='center'
						spacing={1}
						sx={{ marginLeft: 'auto' }}
					>
						<Stack direction='row' alignItems='center'>
							<ThemeSwitcher />
						</Stack>
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
