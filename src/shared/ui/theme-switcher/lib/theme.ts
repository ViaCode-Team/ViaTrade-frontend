import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { getCurrentThemeMode } from '@/shared/lib/theme-mode';

function getThemeLabel(current: 'light' | 'dark'): string {
	return current === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему';
}

function getThemeIcon(current: 'light' | 'dark') {
	return current === 'dark' ? LightModeIcon : DarkModeIcon;
}

export function getThemeState(mode: 'light' | 'dark' | 'system' | undefined,	prefersDark: boolean) {
	const current = getCurrentThemeMode(mode, prefersDark);

	const label = getThemeLabel(current);

	const ThemeIcon = getThemeIcon(current);

	return { current, label, ThemeIcon };
}
