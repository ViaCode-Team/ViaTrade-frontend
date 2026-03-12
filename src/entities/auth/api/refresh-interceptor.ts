import { handleError, interceptors } from '@/shared/api';

// todo: Запрос идёт на рефреш даже без рефреш и аксесс(он для этого запроса не нужен, но если он есть то зачем делать запрос? response.status !== 401 точно всегда поможет?) токена. Исправить

interceptors.response.use(async (response, url, options) => {
	if (response.status !== 401)
		return response;

	const responseRefresh =	await fetch('/api/Auth/refresh', { method: 'POST' });

	if (!responseRefresh.ok) {
		await handleError(responseRefresh);
	}

	return fetch(url, options);
});
