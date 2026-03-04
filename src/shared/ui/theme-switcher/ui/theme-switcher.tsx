import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getThemeState } from '../lib/theme';

export const ThemeSwitcher = () => {
	const { mode, setMode } = useColorScheme();
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

	const { current, label, ThemeIcon } = getThemeState(mode, prefersDark);

	const toggleTheme = () => setMode(current === 'dark' ? 'light' : 'dark');

	return (
		<Tooltip title={label} enterDelay={1000}>
			<IconButton size='small' aria-label={label} onClick={toggleTheme}>
				<ThemeIcon />
			</IconButton>
		</Tooltip>
	);
};
