export const getCurrentThemeMode = (
	mode: 'light' | 'dark' | 'system' | undefined,
	prefersDark: boolean,
): 'light' | 'dark' => {
	if (!mode || mode === 'system') {
		return prefersDark ? 'dark' : 'light';
	}

	return mode;
};
