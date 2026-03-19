(function () {
	const GLOBAL_LOADER_SELECTOR = 'global-loader';
	const BOOT_MIN_VISIBILITY_MS = 500;
	const BOOT_ACQUIRE_DELAY_MS = 500;

	const loader = document.getElementById(GLOBAL_LOADER_SELECTOR);
	const activeTokens = new Set();
	const bootMinShowAt = performance.now() + BOOT_MIN_VISIBILITY_MS;

	let showTimer = null;
	let plannedShowAt = null;

	function showNow() {
		if (!loader)
			return;
		loader.classList.add('show');
	}

	function hideNow() {
		if (!loader)
			return;
		loader.classList.remove('show');
	}

	function scheduleShowAt(targetAt) {
		if (loader?.classList.contains('show'))
			return;
		if (plannedShowAt !== null && plannedShowAt <= targetAt)
			return;

		plannedShowAt = targetAt;
		clearTimeout(showTimer);

		const waitMs = Math.max(0, targetAt - performance.now());
		showTimer = setTimeout(() => {
			plannedShowAt = null;
			showNow();
		}, waitMs);
	}

	function createGlobalLoaderApi() {
		return {
			acquire({ delayMs = 0 } = {}) {
				const token = Symbol('vt-loader-token');
				activeTokens.add(token);

				const showAt = Math.max(
					bootMinShowAt,
					performance.now() + Math.max(0, delayMs),
				);

				scheduleShowAt(showAt);
				return token;
			},
			release(token) {
				if (!activeTokens.has(token))
					return;
				activeTokens.delete(token);
				if (activeTokens.size > 0)
					return;

				clearTimeout(showTimer);
				plannedShowAt = null;
				hideNow();
			},
		};
	}

	const api = createGlobalLoaderApi();
	window.__VT_LOADER__ = api;
	window.__VT_BOOT_LOADER_TOKEN__ = api.acquire({
		delayMs: BOOT_ACQUIRE_DELAY_MS,
	});
})();
