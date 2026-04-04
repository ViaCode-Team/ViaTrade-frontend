import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { getThemeState } from '@/shared/lib/theme-mode';

export function ThemeSwitcher1() {
	const { colorScheme, setColorScheme } = useMantineColorScheme();
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)') ?? false;

	const { current, label, ThemeIcon } = getThemeState(colorScheme, prefersDark);

	const toggleTheme = () => setColorScheme(current === 'dark' ? 'light' : 'dark');

	return (
		<Tooltip label={label} openDelay={1000}>
			<ActionIcon size='sm' aria-label={label} onClick={toggleTheme} variant='subtle'>
				<ThemeIcon size={18} />
			</ActionIcon>
		</Tooltip>
	);
}
