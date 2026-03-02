import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

import LogoIcon from '@/shared/assets/icons/logo-default.svg?react';

import { MenuButton } from './menu-button';

// import ThemeSwitcher from './ThemeSwitcher';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
	borderColor: (theme.vars ?? theme).palette.divider,
	borderWidth: 0,
	borderBottomWidth: 1,
	borderStyle: 'solid',
	boxShadow: 'none',
	displayPrint: 'none',
}));

const Logo = () => (
	<Link to='/' style={{ textDecoration: 'none' }}>
		<Stack direction='row' alignItems='center' gap='5px'>
			<LogoIcon width={32} height={32} />

			<Typography
				variant='h6'
				fontWeight='bold'
				sx={{
					whiteSpace: 'nowrap',
					lineHeight: 1,
				}}
			>
				ViaTrade
			</Typography>
		</Stack>
	</Link>
);

type AppHeaderProps = {
	title?: string;
	isMenuOpen: boolean;
	onToggleMenu: (open: boolean) => void;
};

export const AppHeader = ({ isMenuOpen, onToggleMenu }: AppHeaderProps) => {
	const toggleMenuHandle = () => {
		onToggleMenu(!isMenuOpen);
	};

	return (
		<AppBar
			color='inherit'
			position='static'
			sx={{
				'& .MuiToolbar-root': { px: 1 },
			}}
		>
			<Toolbar sx={{ backgroundColor: 'inherit' }}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					sx={{ width: '100%', flexWrap: 'wrap' }}
				>
					<Stack direction='row' alignItems='center'>
						<Box>
							<MenuButton isExpanded={isMenuOpen} onToggle={toggleMenuHandle} />
						</Box>
					</Stack>

					<Logo />

					<Stack
						direction='row'
						alignItems='center'
						spacing={1}
						sx={{ marginLeft: 'auto' }}
					>
						<Stack direction='row' alignItems='center'>
							{/* <ThemeSwitcher /> */}
						</Stack>
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
