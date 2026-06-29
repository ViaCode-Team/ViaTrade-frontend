import type { MantineGradient } from '@mantine/core';

import { IconMoon } from '@tabler/icons-react';
import { IconSun } from '@tabler/icons-react';

export const brandGradient: MantineGradient = { from: '#ffb752', to: '#e09530', deg: 135 };

export function getCurrentThemeMode(mode: 'light' | 'dark' | 'auto' | undefined, prefersDark: boolean): 'light' | 'dark' {
	if (!mode || mode === 'auto') {
		return prefersDark ? 'dark' : 'light';
	}

	return mode;
}

export function getThemeState(mode: 'light' | 'dark' | 'auto' | undefined, prefersDark: boolean) {
	const current = getCurrentThemeMode(mode, prefersDark);

	const label = getThemeLabel(current);

	const ThemeIcon = getThemeIcon(current);

	return { current, label, ThemeIcon };
}

export function getThemeLabel(current: 'light' | 'dark'): string {
	return current === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему';
}

export function getThemeIcon(current: 'light' | 'dark') {
	return current === 'dark' ? IconSun : IconMoon;
}
