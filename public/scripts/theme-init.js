(function () {
	try {
		let colorScheme = localStorage.getItem('mantine-color-scheme-value') || 'auto';

		if (colorScheme === 'auto') {
			colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		}

		document.documentElement.setAttribute('data-mantine-color-scheme', colorScheme);
	}
	catch {
		// no-op
	}
})();
