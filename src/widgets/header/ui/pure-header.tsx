import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import { Logo } from '@/shared/ui/logo/logo';

import { AppBar } from './app-bar';

// import ThemeSwitcher from './ThemeSwitcher';

type PureHeaderProps = {
	title?: string;
};

export const PureHeader = ({ title }: PureHeaderProps) => {
	return (
		<AppBar position='static'>
			<Toolbar sx={{ backgroundColor: 'inherit' }}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					width={1}
					flexWrap='wrap'
				>
					<Stack direction='row'>
						<Logo logoWidth={32} logoHeight={32} />
					</Stack>

					{title ?? <Box component='h1'>{title}</Box>}
					<Stack direction='row' alignItems='center' spacing={1}>
						<Stack direction='row' alignItems='center'>
							{/* <ThemeSwitcher /> */}
						</Stack>
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
