import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Logo } from '@/shared/ui/logo/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';

import { AppBar } from './app-bar';

type PureHeaderProps = {
	title?: string;
};

export function PureHeader({ title }: PureHeaderProps) {
	return (
		<AppBar>
			<Toolbar>
				<Stack direction='row' alignItems='center' width={1} flexWrap='wrap'>
					<Stack direction='row' flex={1}>
						<Logo logoWidth={32} logoHeight={32} />
					</Stack>

					<Typography variant='h6' component='h2'>
						{title}
					</Typography>

					<Stack
						direction='row'
						alignItems='center'
						spacing={1}
						flex={1}
						justifyContent='flex-end'
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
