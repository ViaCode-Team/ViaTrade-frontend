import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export function getCurrentThemeMode(mode: 'light' | 'dark' | 'system' | undefined,	prefersDark: boolean): 'light' | 'dark' {
	if (!mode || mode === 'system') {
		return prefersDark ? 'dark' : 'light';
	}

	return mode;
}

export function getThemeState(mode: 'light' | 'dark' | 'system' | undefined, prefersDark: boolean) {
	const current = getCurrentThemeMode(mode, prefersDark);

	const label = getThemeLabel(current);

	const ThemeIcon = getThemeIcon(current);

	return { current, label, ThemeIcon };
}

export function getThemeLabel(current: 'light' | 'dark'): string {
	return current === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему';
}

export function getThemeIcon(current: 'light' | 'dark') {
	return current === 'dark' ? LightModeIcon : DarkModeIcon;
}
